package dev.crltoz.bookify.user;

import lombok.Getter;

@Getter
public class UpdateUserPasswordRequest {
    private String oldPassword;
    private String newPassword;
}
