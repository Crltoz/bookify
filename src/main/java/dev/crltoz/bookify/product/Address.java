package dev.crltoz.bookify.product;

import lombok.Getter;

@Getter
public class Address {

    private String country;
    private String city;

    public String toString() {
        return "Address(country=" + this.country + ",city=" + this.city + ")";
    }
}