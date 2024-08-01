package dev.crltoz.bookify.product;

import lombok.Getter;

import java.util.List;

@Getter
public class CreateProductRequest {

    private String name;
    private String description;
    private List<String> images;
    private String categoryId;
    private List<List<String>> features;
    private Address address;
    private String mapUrl;
}
