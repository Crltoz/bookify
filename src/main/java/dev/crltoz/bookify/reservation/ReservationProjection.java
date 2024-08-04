package dev.crltoz.bookify.reservation;

public interface ReservationProjection {
    String getId();

    String getProductId();

    Long getStart();

    Long getEnd();
}
