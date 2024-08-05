// show all products reserved
import React, { useEffect, useState } from "react";
import axios from "axios";
import { subscribe, unsubscribe } from "../events";
import "./css/Reservations.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faStar } from "@fortawesome/free-solid-svg-icons";
import ReviewDialog from "./ReviewDialog";
import DialogText from "./DialogText";
import { jwtDecode } from "jwt-decode";

function getUserId() {
  const token = window.localStorage.getItem("token");
  try {
    const decodedObj = jwtDecode(token);
    return decodedObj.id;
  } catch (e) {
    console.error(e);
    return null;
  }
}

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [products, setProducts] = useState([]);
  const [ratingReservation, setRatingReservation] = useState(null);
  const [dialogText, setDialogText] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");
  const [myReviews, setMyReviews] = useState([]);

  useEffect(() => {
    updateReservations();
    updateReviews();

    subscribe("updateReservation", updateReservationEvent);
    subscribe("createReview", createReviewEvent);

    return () => {
      unsubscribe("updateReservation", updateReservationEvent);
      unsubscribe("createReview", createReviewEvent);
    };
  }, []);

  const createReviewEvent = async ({ detail }) => {
    const userId = detail[1];
    const reviewId = detail[2];
    if (getUserId() != userId || !reviewId) return;
    const newReview = await axios.get("/products/getReviewById/" + reviewId);
    if (newReview.status !== 200) return;
    setMyReviews((prev) => [...prev, newReview.data]);
  };

  const updateReviews = async () => {
    const reviews = await axios.get("/users/reviews");
    if (reviews.status !== 200) return;
    setMyReviews(reviews.data);
  };

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

  const handleSendReview = async ({ rating, comment }) => {
    const addReview = await axios.post("/products/review", {
      productId: getProductForReservation(ratingReservation).id,
      rating: rating,
      comment: comment,
    });

    switch (addReview.status) {
      case 200:
        setDialogTitle("¡Éxito!");
        setDialogText(
          "Tu reseña ha sido enviada correctamente. ¡Gracias por tu opinión!"
        );
        break;
      case 401:
        setDialogTitle("Error");
        setDialogText(
          "Debes iniciar sesión para enviar una reseña. Por favor, inicia sesión e inténtalo de nuevo."
        );
        break;
      case 404:
        setDialogTitle("Error");
        setDialogText(
          "El producto que intentas calificar no existe. Por favor, inténtalo de nuevo."
        );
        break;
      case 409:
        setDialogTitle("Error");
        setDialogText(
          "Ya has enviado una reseña para este producto. No puedes enviar más de una reseña por producto."
        );
        break;
      default:
        setDialogTitle("Error");
        setDialogText(
          "Ha ocurrido un error al enviar la reseña. Inténtalo de nuevo más tarde."
        );
        break;
    }

    setRatingReservation(null);
  };

  return (
    <div className="container d-flex justify-content-center min-vh-100 margin-logged">
      <div className="d-flex flex-column">
        <DialogText
          text={dialogText}
          title={dialogTitle}
          onConfirm={() => setDialogText("")}
          onClose={() => setDialogText("")}
        />
        <ReviewDialog
          open={ratingReservation != null}
          onClose={() => setRatingReservation(null)}
          onSubmit={handleSendReview}
        />
        <div className="row">
          <h1>Reservas</h1>
        </div>
        <hr></hr>
        {reservations.sort((a, b) => a.start - b.start).map((reservation, index) => (
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
                onClick={() =>
                  onSelectItem(getProductForReservation(reservation))
                }
              />
              <div className="card-body">
                <h5
                  className="card-title"
                  onClick={() =>
                    onSelectItem(getProductForReservation(reservation))
                  }
                >
                  {getProductForReservation(reservation)?.name || "Product"}
                </h5>
                <p className="card-text" style={{ maxWidth: '70ch', wordWrap: 'break-word' }}>
                  {getProductForReservation(reservation)?.description}
                </p>
              </div>
              <div className="card-footer" style={{ width: "50%" }}>
                <div className="card-text reservation-info">
                  <b>
                    <FontAwesomeIcon
                      className="text-success"
                      icon={faCalendar}
                    />{" "}
                    Fecha de ingreso (Check-in):
                  </b>
                  <p>
                    {new Date(reservation.start).toLocaleDateString("es-ES")}{" "}
                    {new Date(reservation.start).toLocaleTimeString("es-ES", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                <div className="card-text reservation-info mt-3">
                  <b>
                    <FontAwesomeIcon
                      className="text-danger"
                      icon={faCalendar}
                    />{" "}
                    Fecha de salida (Check-out):
                  </b>
                  <p>
                    {new Date(reservation.end).toLocaleDateString("es-ES")}{" "}
                    {new Date(reservation.end).toLocaleTimeString("es-ES", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                {myReviews.findIndex(
                  (it) =>
                    it.productId === getProductForReservation(reservation)?.id
                ) === -1 && (
                  <button
                    className="btn btn-success text-white mt-4"
                    onClick={() => setRatingReservation(reservation)}
                  >
                    <FontAwesomeIcon icon={faStar} /> Calificar
                  </button>
                )}
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
                onClick={() =>
                  onSelectItem(getProductForReservation(reservation))
                }
              />
              <div className="card-body">
                <h5
                  className="card-title"
                  onClick={() =>
                    onSelectItem(getProductForReservation(reservation))
                  }
                >
                  {getProductForReservation(reservation)?.name || "Product"}
                </h5>
                <p className="card-text">
                  {getProductForReservation(reservation)?.description}
                </p>
              </div>
              <div className="card-footer" style={{ width: "100%" }}>
                <div className="card-text reservation-info d-flex justify-content-center">
                  <b>
                    <FontAwesomeIcon
                      className="text-success"
                      icon={faCalendar}
                    />{" "}
                    Fecha de ingreso (Check-in):
                  </b>
                  <p className="ms-2">
                    {new Date(reservation.start).toLocaleDateString("es-ES")}{" "}
                    {new Date(reservation.start).toLocaleTimeString("es-ES", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                <div className="card-text reservation-info d-flex justify-content-center mt-2">
                  <b>
                    <FontAwesomeIcon
                      className="text-danger"
                      icon={faCalendar}
                    />{" "}
                    Fecha de salida (Check-out):
                  </b>
                  <p className="ms-2">
                    {new Date(reservation.end).toLocaleDateString("es-ES")}{" "}
                    {new Date(reservation.end).toLocaleTimeString("es-ES", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                <div className="d-flex justify-content-center mt-3">
                  {myReviews.findIndex(
                    (it) =>
                      it.productId === getProductForReservation(reservation)?.id
                  ) === -1 && (
                    <button
                      className="btn btn-success text-white"
                      onClick={() => setRatingReservation(reservation)}
                    >
                      <FontAwesomeIcon icon={faStar} /> Calificar
                    </button>
                  )}
                </div>
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
