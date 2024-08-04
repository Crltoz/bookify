// show all products reserved
import React, { useEffect, useState } from "react";
import axios from "axios";
import { subscribe, unsubscribe } from "../events";
import "./css/Reservations.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faStar } from "@fortawesome/free-solid-svg-icons";

function getUserId() {
  const token = window.localStorage.getItem("token");
  try {
    const decodedObj = jwtDecode(token);
    return decodedObj.id;
  } catch (e) {
    return null;
  }
}

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    updateReservations();

    subscribe("updateReservation", updateReservationEvent);

    return () => {
      unsubscribe("updateReservation", updateReservationEvent);
    };
  }, []);

  const updateReservationEvent = ({ detail }) => {
    const userId = detail[1];
    if (getUserId() == userId) {
      updateReservations();
    }
  };

  const updateReservations = async () => {
    axios
      .get("/users/reservations")
      .then((response) => {
        if (response.status === 200) {
          setReservations(response.data);

          // remove duplicated productIds from list to avoid multiple requests
          const uniqueProductIds = new Set(
            response.data.map((reservation) => reservation.productId)
          );

          setProducts([]);

          for (let productId of uniqueProductIds) {
            axios
              .get("/products/get/" + productId)
              .then((response) => {
                if (response.status === 200) {
                  setProducts((prev) => [...prev, response.data]);
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSelectItem = (product) => {
    window.location.href = "/product?id=" + product.id;
  };

  const getProductForReservation = (reservation) => {
    return products.find((product) => product.id === reservation.productId);
  };

  return (
    <div className="container d-flex justify-content-center min-vh-100">
      <div className="d-flex flex-column margin-logged">
        <div className="row">
          <h1>Reservas</h1>
        </div>
        <hr></hr>
        {reservations.map((reservation, index) => (
          <div key={index} className="col-sm-12 mb-3">
            <div className="card d-lg-flex flex-row d-none">
              <img
                src={
                  getProductForReservation(reservation)?.images[0] ||
                  "https://via.placeholder.com/300"
                }
                alt={getProductForReservation(reservation)?.name || "Product"}
                className="card-img-left"
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                }}
                onClick={() => onSelectItem(getProductForReservation(reservation))}
              />
              <div className="card-body">
                <h5 className="card-title" onClick={() => onSelectItem(getProductForReservation(reservation))}>
                  {getProductForReservation(reservation)?.name || "Product"}
                </h5>
                <p className="card-text">
                  {getProductForReservation(reservation)?.description}
                </p>
              </div>
              <div className="card-footer" style={{ width: "50%" }}>
                <p className="card-text reservation-info">
                  <p>
                    <b>
                      <FontAwesomeIcon
                        className="text-success"
                        icon={faCalendar}
                      />{" "}
                      Fecha de ingreso (Check-in):
                    </b>
                  </p>
                  <span>
                    {new Date(reservation.start).toLocaleDateString("es-ES")}{" "}
                    {new Date(reservation.start).toLocaleTimeString("es-ES", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </p>

                <p className="card-text reservation-info">
                  <p>
                    <b>
                      <FontAwesomeIcon
                        className="text-danger"
                        icon={faCalendar}
                      />{" "}
                      Fecha de salida (Check-out):
                    </b>
                  </p>
                  <span>
                    {new Date(reservation.end).toLocaleDateString("es-ES")}{" "}
                    {new Date(reservation.end).toLocaleTimeString("es-ES", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </p>

                <button className="btn btn-success text-white">
                  <FontAwesomeIcon icon={faStar} /> Calificar
                </button>
              </div>
            </div>

            <div className="card d-lg-none">
              <img
                src={
                  getProductForReservation(reservation)?.images[0] ||
                  "https://via.placeholder.com/300"
                }
                alt={getProductForReservation(reservation)?.name || "Product"}
                className="card-img-top user-select-none rounded image-effect"
              />
              <div className="card-body">
                <h5 className="card-title">
                  {getProductForReservation(reservation)?.name || "Product"}
                </h5>
                <p className="card-text">
                  {getProductForReservation(reservation)?.description}
                </p>
              </div>
              <div className="card-footer" style={{ width: "100%" }}>
                <p className="card-text reservation-info">
                  <p>
                    <b>
                      <FontAwesomeIcon
                        className="text-success"
                        icon={faCalendar}
                      />{" "}
                      Fecha de ingreso (Check-in):
                    </b>
                  </p>
                  <span>
                    {new Date(reservation.start).toLocaleDateString("es-ES")}{" "}
                    {new Date(reservation.start).toLocaleTimeString("es-ES", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </p>

                <p className="card-text reservation-info">
                  <p>
                    <b>
                      <FontAwesomeIcon
                        className="text-danger"
                        icon={faCalendar}
                      />{" "}
                      Fecha de salida (Check-out):
                    </b>
                  </p>
                  <span>
                    {new Date(reservation.end).toLocaleDateString("es-ES")}{" "}
                    {new Date(reservation.end).toLocaleTimeString("es-ES", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </p>

                <button className="btn btn-success text-white">
                  <FontAwesomeIcon icon={faStar} /> Calificar
                </button>
              </div>
            </div>

            <hr></hr>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reservations;
