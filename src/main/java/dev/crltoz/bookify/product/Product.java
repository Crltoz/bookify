package dev.crltoz.bookify.product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "products")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id
    private String id;

    private String name;

    private String description;

    private List<String> images;

    private List<List<String>> features;

    private Address address;

    private String mapUrl;

    public Product(String name, String description, List<String> images, List<List<String>> features, Address address, String mapUrl) {
        this.name = name;
        this.description = description;
        this.images = images;
        this.features = features;
        this.address = address;
        this.mapUrl = mapUrl;
    }
}
