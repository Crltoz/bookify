import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationPin,
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { subscribe, unsubscribe } from "../events";

const ProductEntry = ({ product, onSelectItem, from, to }) => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    updateReservations();
    subscribe("updateReservation", updateReservationEvent);

    return () => {
      unsubscribe("updateReservation", updateReservationEvent);
    };
  }, []);

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

  return (
    <div className="col-sm-auto mb-4" key={product.name}>
      <div className="card d-lg-flex flex-row d-none">
        <img
          src={product.images[0] || "https://via.placeholder.com/300"}
          className="card-img-left user-select-none rounded image-effect"
          alt={product.name}
          onClick={() => onSelectItem(product)}
        />
        <div className="card-body d-flex flex-column justify-content-between align-items-center">
          <h5 className="card-title" onClick={() => onSelectItem(product)}>
            {product.name}
          </h5>
          <p className="card-text">{product.description}</p>
          <button href={product.link} className="btn btn-outline-success">
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
        <div className="card-body">
          <h5 className="card-title" onClick={() => onSelectItem(product)}>
            {product.name}
          </h5>
          <p className="card-text">{product.description}</p>
          <button href={product.link} className="btn btn-outline-success">
            <FontAwesomeIcon icon={faLocationPin} className="me-2" />
            {product.address.country + ", " + product.address.city}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductEntry;
