package dev.crltoz.bookify.product;

import dev.crltoz.bookify.category.Category;
import dev.crltoz.bookify.category.CategoryService;
import dev.crltoz.bookify.user.UserService;
import dev.crltoz.bookify.websocket.WebSocketService;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private UserService userService;

    @Autowired
    private WebSocketService webSocketService;

    @GetMapping
    public ResponseEntity<List<Product>> allProducts(@RequestHeader("Authorization") String token) {
        // check if is admin
        if (!userService.isAdmin(token)) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(productService.getAllProducts(), HttpStatus.OK);
    }

    @GetMapping("/home")
    public ResponseEntity<List<Product>> homeProducts() {
        return new ResponseEntity<>(getRandomProducts(), HttpStatus.OK);
    }

    private List<Product> getRandomProducts() {
        // all products
        List<Product> products = productService.getAllProducts();
        // shuffle products
        Collections.shuffle(products);
        // return first 100 products
        int toIndex = Math.min(products.size(), 100);
        return products.subList(0, toIndex);
    }

    @GetMapping("/addresses")
    public ResponseEntity<HashSet<Address>> allAddresses() {
        return new ResponseEntity<>(productService.getAllAddresses(), HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam String query) {
        query = cleanSearchString(query);

        // limit to 3 queries
        String[] queries = Arrays.stream(query.split(" ")).limit(3).toArray(String[]::new);

        if (query.isBlank() || queries.length == 0) {
            return new ResponseEntity<>(getRandomProducts(), HttpStatus.OK);
        }

        // add the first query to the rest of the queries if there are less than 3
        while (queries.length < 3) {
            queries = Arrays.copyOf(queries, queries.length + 1);
            queries[queries.length - 1] = queries[0];
        }
        List<Product> products = productService.getProductsByCountryAndCityQuery(queries[0], queries[1], queries[2]);

        if (products.isEmpty()) {
            return new ResponseEntity<>(getRandomProducts(), HttpStatus.OK);
        }

        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    public static String cleanSearchString(String search) {
        return search.replaceAll("[^a-zA-Z\\s]", "");
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Optional<Product>> getProductById(@PathVariable ObjectId id) {
        // return 404 if product not found
        Optional<Product> product = productService.getProductById(id);
        if (product.isEmpty()) {
            return new ResponseEntity<>(product, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Product> addProduct(@RequestBody CreateProductRequest productRequest, @RequestHeader("Authorization") String token) {
        // check if is admin
        if (!userService.isAdmin(token)) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        // first check if product already exists by name
        List<Product> products = productService.getAllProducts();
        for (Product p : products) {
            if (p.getName().equals(productRequest.getName())) {
                return new ResponseEntity<>(p, HttpStatus.CONFLICT);
            }
        }

        Category category = null;

        // check if category exists
        if (ObjectId.isValid(productRequest.getCategoryId())) {
            category = categoryService.getCategoryById(new ObjectId(productRequest.getCategoryId())).orElse(null);
        }


        // create product
        Product product = new Product(
                productRequest.getName(),
                productRequest.getDescription(),
                productRequest.getImages(),
                productRequest.getFeatures(),
                productRequest.getAddress(),
                productRequest.getMapUrl()
        );

        productService.save(product);

        if (category != null) {
            // add product to category
            categoryService.addProductToCategory(new ObjectId(category.getId()), new ObjectId(product.getId()));
        }

        // send websocket message
        webSocketService.sendMessage("updateProduct", List.of(product.getId()));
        return new ResponseEntity<>(product, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable ObjectId id, @RequestHeader("Authorization") String token) {
        // check if is admin
        if (!userService.isAdmin(token)) {
            return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
        }

        // return 404 if product not found
        Product product = productService.getProductById(id).orElse(null);
        if (product == null) {
            return new ResponseEntity<>("Product not found", HttpStatus.NOT_FOUND);
        }

        // get category
        Category category = categoryService.getCategoryByProductId(id);

        // remove product from category
        if (category != null) {
            categoryService.removeProductFromCategory(category, id);
        }

        productService.deleteProduct(id);

        // send websocket message
        webSocketService.sendMessage("deleteProduct", List.of(id.toString()));
        return new ResponseEntity<>("Product deleted", HttpStatus.OK);
    }

    @PostMapping("/edit")
    public ResponseEntity<Product> editProduct(@RequestBody UpdateProductRequest productRequest, @RequestHeader("Authorization") String token) {
        // check if is admin
        if (!userService.isAdmin(token)) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        if (!ObjectId.isValid(productRequest.getId())) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        ObjectId id = new ObjectId(productRequest.getId());

        // return 404 if product not found
        Product product = productService.getProductById(id).orElse(null);
        if (product == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        Category category = categoryService.getCategoryByProduct(product);

        // check if category id change
        if ((category != null && productRequest.getCategoryId().isBlank()) ||
            (category == null && !productRequest.getCategoryId().isBlank()) ||
                (category != null && !Objects.equals(category.getId(), productRequest.getCategoryId()))) {

            // remove product from old category
            if (category != null) {
                categoryService.removeProductFromCategory(category, id);
                webSocketService.sendMessage("updateCategory", List.of(category.getId()));
            }

            // check if new category exists and set
            if (ObjectId.isValid(productRequest.getCategoryId())) {
                if (categoryService.getCategoryById(new ObjectId(productRequest.getCategoryId())).isPresent()) {
                    // add product to new category
                    categoryService.addProductToCategory(new ObjectId(productRequest.getCategoryId()), id);
                    webSocketService.sendMessage("updateCategory", List.of(productRequest.getCategoryId()));
                }
            }
        }

        // update product
        Product updatedProduct = new Product(
                productRequest.getName(),
                productRequest.getDescription(),
                productRequest.getImages(),
                productRequest.getFeatures(),
                productRequest.getAddress(),
                productRequest.getMapUrl()
        );
        updatedProduct.setId(id.toString());
        productService.save(updatedProduct);

        // send websocket message
        webSocketService.sendMessage("updateProduct", List.of(id.toString()));
        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }
}
