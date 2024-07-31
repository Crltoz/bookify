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

    private String categoryId;

    private List<List<String>> features;

    public Product(String name, String description, List<String> images, String categoryId, List<List<String>> features) {
        this.name = name;
        this.description = description;
        this.images = images;
        this.categoryId = categoryId;
        this.features = features;
    }
}
