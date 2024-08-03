package dev.crltoz.bookify.product;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ProductService {

    @Autowired
    ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(ObjectId id) {
        return productRepository.findById(id);
    }

    public Product save(Product product) {
        return productRepository.save(product);
    }

    public void deleteProduct(ObjectId id) {
        productRepository.deleteById(id);
    }

    public List<Product> getProductsByCountryAndCity(String country, String city) {
        return productRepository.findByAddress_CountryAndAddress_City(country, city);
    }

    public Map<String, HashSet<String>> getAllAddresses() {
        Collection<ProductSummary> products = productRepository.findAllAddresses();
        HashMap<String, HashSet<String>> addressMap = new HashMap<>(Collections.emptyMap());

        for (ProductSummary productSummary : products) {
            Address address = productSummary.getAddress();
            if (addressMap.containsKey(address.getCountry())) {
                addressMap.get(address.getCountry()).add(address.getCity());
            } else {
                addressMap.put(address.getCountry(), new HashSet<>(Collections.singletonList(address.getCity())));
            }
        }

        return addressMap;
    }
}
