package dev.crltoz.bookify.user;

import lombok.Getter;

@Getter
public class LoginUserRequest {
    private String email;
    private String password;
}
