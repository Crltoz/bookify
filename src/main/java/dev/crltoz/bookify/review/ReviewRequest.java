package dev.crltoz.bookify.review;

import lombok.Getter;
import org.bson.types.ObjectId;

@Getter
public class ReviewRequest {
    private ObjectId productId;
    private int rating;
    private String comment;
}
