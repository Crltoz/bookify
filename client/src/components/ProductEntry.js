import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationPin,
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { subscribe, unsubscribe } from "../events";
import ReviewSmall from "./ReviewSmall";

const ProductEntry = ({ product, onSelectItem, from, to }) => {
  const [reservations, setReservations] = useState([]);
  const [rating, setRating] = useState({ rating: 0, ratingCount: 0 });

  useEffect(() => {
    updateReservations();
    subscribe("updateReservation", updateReservationEvent);
    subscribe("createReview", createReviewEvent);
    setRating({ rating: product.rating, ratingCount: product.ratingCount });

    return () => {
      unsubscribe("updateReservation", updateReservationEvent);
      unsubscribe("createReview", createReviewEvent);
    };
  }, []);

  const createReviewEvent = async ({ detail }) => {
    const productId = detail[0];
    if (productId != product.id) return;
    const reviewId = detail[2];
    if (!reviewId) return;
    const response = await axios.get("/products/getReviewById/" + reviewId);
    if (response.status === 200) {
      const review = response.data;
      const newRating =
        (product.rating * product.ratingCount + review.rating) /
        (product.ratingCount + 1);
      setRating({ rating: newRating, ratingCount: product.ratingCount + 1 });
      product.rating = newRating;
      product.ratingCount += 1;
    }
  };

  const updateReservationEvent = ({ detail }) => {
    const productId = detail[0];
    if (productId == product.id) {
      updateReservations();
    }
  };

  const updateReservations = async () => {
    axios
      .get("/products/reservations/" + product.id)
      .then((response) => {
        if (response.status === 200) {
          setReservations(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const checkAvailable = () => {
    // reservations is an array of objects with the following structure:
    // [{start: timestamp, end: timestamp}, ...]
    if (reservations.length === 0) return true;
    const available = reservations.every((reservation) => {
      if (from < reservation.end && to > reservation.start) return false;
      return true;
    });
    return available;
  };

  const openMap = (url) => {
    if (!url) return;
    window.open(url, "_blank");
  };

  return (
    <div className="col-sm-auto mb-4" key={product.name}>
      <div className="card d-lg-flex flex-row d-none">
        <div>
          <img
            src={product.images[0] || "https://via.placeholder.com/300"}
            className="card-img-left user-select-none rounded image-effect"
            alt={product.name}
            onClick={() => onSelectItem(product)}
          />
          <div className="justify-content-center pb-2 pt-2">
            <ReviewSmall stars={rating.rating} reviews={rating.ratingCount} />
          </div>
        </div>
        <div className="card-body d-flex flex-column justify-content-between align-items-center">
          <h5 className="card-title" onClick={() => onSelectItem(product)}>
            {product.name}
          </h5>
          <p className="card-text">
            {product.description.slice(0, 325)}
            {product.description.length > 320 && "..."}{" "}
          </p>
          <button
            onClick={() => openMap(product.mapUrl)}
            className="btn btn-outline-success"
          >
            <FontAwesomeIcon icon={faLocationPin} className="me-2" />
            {product.address.country + ", " + product.address.city}
          </button>
          {from && to && (
            // lower font size
            <div className="small mt-3">
              Disponible en las fechas seleccionadas:{" "}
              <FontAwesomeIcon
                className={checkAvailable() ? "text-success" : "text-danger"}
                icon={checkAvailable() ? faCircleCheck : faCircleXmark}
              />
            </div>
          )}
        </div>
      </div>

      <div className="card d-lg-none">
        <img
          src={product.images[0] || "https://via.placeholder.com/300"}
          className="card-img-top user-select-none rounded image-effect"
          alt={product.name}
          onClick={() => onSelectItem(product)}
        />
        <div className="mt-2">
          <ReviewSmall stars={rating.rating} reviews={rating.ratingCount} />
        </div>
        <div className="card-body">
          <h5 className="card-title" onClick={() => onSelectItem(product)}>
            {product.name}
          </h5>
          <p className="card-text">
            {product.description.slice(0, 325)}
            {product.description.length > 320 && "..."}
          </p>
          <button
            onClick={() => openMap(product.mapUrl)}
            className="btn btn-outline-success"
          >
            <FontAwesomeIcon icon={faLocationPin} className="me-2" />
            {product.address.country + ", " + product.address.city}
          </button>
          {from && to && (
            // lower font size
            <div className="small mt-3">
              Disponible en las fechas seleccionadas:{" "}
              <FontAwesomeIcon
                className={checkAvailable() ? "text-success" : "text-danger"}
                icon={checkAvailable() ? faCircleCheck : faCircleXmark}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductEntry;
