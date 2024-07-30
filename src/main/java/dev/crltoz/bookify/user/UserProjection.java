package dev.crltoz.bookify.user;

public interface UserProjection {

    String getId();

    String getFirstName();

    String getLastName();

    String getEmail();

    boolean getIsAdmin();
}
