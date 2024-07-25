package dev.crltoz.bookify.user;

import lombok.Getter;

@Getter
public class CreateUserRequest {
    private String username;
    private String password;
    private boolean isAdmin;
}