package dev.crltoz.bookify.category;

import lombok.Getter;

@Getter
public class CreateCategoryRequest {
    private String name;
    private String description;
    private String image;
}
