package dev.crltoz.bookify.product;

import dev.crltoz.bookify.category.Category;
import dev.crltoz.bookify.category.CategoryService;
import dev.crltoz.bookify.util.JwtUtil;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping
    public ResponseEntity<List<Product>> allProducts(@RequestHeader("Authorization") String token) {
        // check if is admin
        if (!jwtUtil.isAdmin(token)) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(productService.getAllProducts(), HttpStatus.OK);
    }

    @GetMapping("/home")
    public ResponseEntity<List<Product>> homeProducts() {
        // all products
        List<Product> products = productService.getAllProducts();
        // shuffle products
        Collections.shuffle(products);
        // return first 100 products
        int toIndex = Math.min(products.size(), 100);
        return new ResponseEntity<>(products.subList(0, toIndex), HttpStatus.OK);
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
        if (!jwtUtil.isAdmin(token)) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        // first check if product already exists by name
        List<Product> products = productService.getAllProducts();
        for (Product p : products) {
            if (p.getName().equals(productRequest.getName())) {
                return new ResponseEntity<>(p, HttpStatus.CONFLICT);
            }
        }

        String categoryId = "";
        Category category = null;

        // check if category exists
        if (ObjectId.isValid(productRequest.getCategoryId())) {
            category = categoryService.getCategoryById(new ObjectId(productRequest.getCategoryId())).orElse(null);
            if (category != null) {
                categoryId = productRequest.getCategoryId();
            }
        }


        // create product
        Product product = new Product(
                productRequest.getName(),
                productRequest.getDescription(),
                productRequest.getImages(),
                categoryId
        );

        productService.save(product);

        if (category != null) {
            // add product to category
            categoryService.addProductToCategory(new ObjectId(category.getId()), new ObjectId(product.getId()));
        }

        return new ResponseEntity<>(product, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable ObjectId id, @RequestHeader("Authorization") String token) {
        // check if is admin
        if (!jwtUtil.isAdmin(token)) {
            return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
        }

        // return 404 if product not found
        Product product = productService.getProductById(id).orElse(null);
        if (product == null) {
            return new ResponseEntity<>("Product not found", HttpStatus.NOT_FOUND);
        }

        // remove product from category
        if (ObjectId.isValid(product.getCategoryId())) {
            categoryService.removeProductFromCategory(new ObjectId(product.getCategoryId()), id);
        }

        productService.deleteProduct(id);
        return new ResponseEntity<>("Product deleted", HttpStatus.OK);
    }

    @PostMapping("/edit/{id}")
    public ResponseEntity<Product> editProduct(@PathVariable ObjectId id, @RequestBody CreateProductRequest productRequest, @RequestHeader("Authorization") String token) {
        // check if is admin
        if (!jwtUtil.isAdmin(token)) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        // return 404 if product not found
        Product product = productService.getProductById(id).orElse(null);
        if (product == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        String categoryId = product.getCategoryId();

        // check if category id change
        if (!Objects.equals(productRequest.getCategoryId(), product.getCategoryId())) {
            // remove product from old category
            if (ObjectId.isValid(product.getCategoryId())) {
                categoryService.removeProductFromCategory(new ObjectId(product.getCategoryId()), id);
            }

            // check if new category exists and set
            if (ObjectId.isValid(productRequest.getCategoryId())) {
                if (categoryService.getCategoryById(new ObjectId(productRequest.getCategoryId())).isPresent()) {
                    // add product to new category
                    categoryService.addProductToCategory(new ObjectId(productRequest.getCategoryId()), id);
                } else {
                    // set category id to empty if category not found
                    categoryId = "";
                }
            }
        }

        // update product
        Product updatedProduct = new Product(
                productRequest.getName(),
                productRequest.getDescription(),
                productRequest.getImages(),
                categoryId
        );
        updatedProduct.setId(id.toString());

        productService.save(updatedProduct);
        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }
}
