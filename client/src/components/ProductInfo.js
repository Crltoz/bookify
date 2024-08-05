import * as React from "react";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCalendar,
  faCircle,
  faCirclePlus,
  faComment,
  faList,
  faLock,
  faPhotoFilm,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import "./css/ProductInfo.css";
import DialogCarousel from "./DialogCarousel";
import { Icon } from "@mui/material";
import axios from "axios";
import { subscribe, unsubscribe } from "../events";
import Share from "./Share";
import HomeLoader from "./HomeLoader";
import DialogText from "./DialogText";
import DatePicker from "./DatePicker";
import { jwtDecode } from "jwt-decode";
import ReviewSmall from "./ReviewSmall";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

function srcset(image) {
  return {
    src: `${image || "https://via.placeholder.com/300"}`,
    srcSet: `${image || "https://via.placeholder.com/300"}`,
  };
}

// the client here is in url http://url.com/product?id=123
function getProductId() {
  return new URLSearchParams(window.location.search).get("id");
}

function getUserId() {
  const token = window.localStorage.getItem("token");
  try {
    const decodedObj = jwtDecode(token);
    return decodedObj.id;
  } catch (e) {
    return null;
  }
}

function getUserName() {
  const token = window.localStorage.getItem("token");
  try {
    const decodedObj = jwtDecode(token);
    return decodedObj.name + " " + decodedObj.lastName;
  } catch (e) {
    return null;
  }
}

const from = new URLSearchParams(window.location.search).get("from");
const to = new URLSearchParams(window.location.search).get("to");

export default function ProductInfo() {
  const [images, setImages] = React.useState([]);
  const [index, setIndex] = React.useState(-1);
  const [product, setProduct] = React.useState(null);
  const [showGalery, setShowGalery] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [openShare, setOpenShare] = React.useState(false);
  const [wishlist, setWishlist] = React.useState([]);
  const [openText, setOpenText] = React.useState("");
  const [dialogButton, setDialogButton] = React.useState("Aceptar");
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [dateSelected, setDateSelected] = React.useState({
    startDate: from,
    endDate: to,
  });
  const [disabledDates, setDisabledDates] = React.useState([]);
  const [reviews, setReviews] = React.useState([]);
  const [reviewers, setReviewers] = React.useState({});
  const reviewersRef = React.useRef(reviewers);
  const [redirectLogin, setRedirectLogin] = React.useState(false);
  const redirectLoginRef = React.useRef(redirectLogin);

  const mainClass =
    getUserId() != null ? " margin-logged" : " margin-not-logged";

  const onClose = () => {
    // close the dialog, go back to the previous page in location
    window.history.back();
  };

  React.useEffect(() => {
    const productId = getProductId();

    if (!productId) return;
    // update reviews
    updateReviews();

    // get the product by id
    axios.get(`/products/get/${productId}`).then((response) => {
      if (response.status != 200) {
        // send to main
        window.location.href = "/";
        return;
      }

      setProduct(response.data);
      updateDisabledDates();
      setTimeout(() => {
        // extra time to load images
        setLoading(false);
      }, 1000);
    });

    if (getUserId()) {
      updateWishlistEvent({ detail: getUserId() });
    }

    subscribe("updateProduct", updateProductEvent);
    subscribe("deleteProduct", deleteProductEvent);
    subscribe("updateWishlist", updateWishlistEvent);
    subscribe("updateReservation", updateReservationEvent);
    subscribe("createReview", createReviewEvent);

    return () => {
      unsubscribe("updateProduct");
      unsubscribe("deleteProduct");
      unsubscribe("updateWishlist");
      unsubscribe("updateReservation");
      unsubscribe("updateReviews");
    };
  }, []);

  React.useEffect(() => {
    reviewersRef.current = reviewers;
  }, [reviewers]);

  React.useEffect(() => {
    redirectLoginRef.current = redirectLogin;
  }, [redirectLogin]);

  const updateWishlistEvent = ({ detail }) => {
    if (!getUserId() || getUserId() != detail) return;

    axios.get("/users/wishlist").then((response) => {
      if (response.status != 200) return;
      setWishlist(response.data);
    });
  };

  const updateReservationEvent = ({ detail }) => {
    const productId = getProductId();
    if (productId === detail[0]) {
      updateDisabledDates();
    }
  };

  const createReviewEvent = ({ detail }) => {
    const productId = detail[0];
    const reviewId = detail[2];
    if (getProductId() !== productId) return;
    if (!reviewId) return;
    axios.get(`/products/getReviewById/${reviewId}`).then((response) => {
      if (response.status != 200) return;
      setReviews((prev) => [...prev, response.data]);
      updateReviewersNames([response.data]);
    });
  };

  const updateReviews = () => {
    if (!getProductId()) return;
    axios
      .get(`/products/getReviewProductId/${getProductId()}`)
      .then((response) => {
        if (response.status != 200) return;
        setReviews(response.data);

        // add reviewers names
        updateReviewersNames(response.data);
      });
  };

  const updateReviewersNames = (reviews) => {
    for (let review of reviews) {
      if (reviewersRef.current[review.userId] == null) {
        axios.get(`/users/getName/${review.userId}`).then((response) => {
          if (response.status != 200) return;
          reviewersRef.current[review.userId] = response.data;
          setReviewers({ ...reviewersRef.current });
        });
      }
    }
  };

  React.useEffect(() => {
    setImages(product?.images || []);
  }, [product]);

  const toggleGalery = (index) => {
    setIndex(index);
    setShowGalery(index !== -1);
  };

  const toggleProductWishlist = () => {
    if (!getUserId()) {
      setRedirectLogin(true);
      setDialogButton("Iniciar sesión");
      setOpenText(
        "Inicia sesión o registrate para añadir productos a tus favoritos."
      );
      return;
    }

    const productId = getProductId();

    if (wishlist.find((it) => it == productId) != null) {
      axios.delete(`/users/wishlist/remove/${productId}`);
    } else {
      axios.post(`/users/wishlist/add/${productId}`);
    }
  };

  const updateProductEvent = ({ detail }) => {
    const productId = detail;
    if (getProductId() === productId) {
      try {
        axios.get(`/products/get/${productId}`).then((response) => {
          if (response.status != 200) return;
          setProduct(response.data);
          updateDisabledDates();
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  const updateDisabledDates = () => {
    axios.get(`/products/reservations/${getProductId()}`).then((response) => {
      if (response.status != 200) return;
      for (let reservation of response.data) {
        // need one date for every day of reservation
        const start = new Date(reservation.start);
        const end = new Date(reservation.end);

        // add the dates to the disabled dates
        setDisabledDates((prev) => [...prev, start]);

        const diff = Math.abs(end - start);
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
        for (let i = 1; i < days; i++) {
          const date = new Date(start + i * 1000 * 60 * 60 * 24);
          date.setDate(date.getDate() + i);
          setDisabledDates((prev) => [...prev, date]);
        }
      }
    });
  };

  const deleteProductEvent = ({ detail }) => {
    const productId = detail;
    if (getProductId() === productId) {
      onClose();
      return;
    }
  };

  const showReservation = () => {
    if (!getUserId()) {
      setRedirectLogin(true);
      setDialogButton("Iniciar sesión");
      setOpenText("Inicia sesión o registrate para reservar.");
      return;
    }

    setShowDatePicker(true);
  };

  const handleSelectedDate = (date) => {
    if (date[0] && date[0].startDate && date[0].endDate) {
      const startDate = date[0].startDate.getTime();
      const endDate = date[0].endDate.getTime();
      setDateSelected({ startDate: startDate, endDate: endDate });
      setDialogButton("Reservar");
      setOpenText(
        `¿Estás seguro que quieres reservar en las fechas seleccionadas? Son ${
          (endDate - startDate) / 1000 / 60 / 60 / 24
        } noches. Check-in: ${new Date(startDate).toLocaleDateString(
          "es-ES"
        )} Check-out: ${new Date(endDate).toLocaleDateString("es-ES")} | 
        La reserva estará a tu nombre: ${getUserName()} | 
        Los datos de la reserva serán enviados a tu correo electrónico.`
      );
    }
    setShowDatePicker(false);
  };

  const handleConfirmDialog = () => {
    if (redirectLoginRef.current) {
      setOpenText("");
      window.location.href = "/login";
      return;
    }

    if (dateSelected.startDate && dateSelected.endDate) {
      const productId = getProductId();
      axios
        .post(`/products/reserve`, {
          start: dateSelected.startDate,
          end: dateSelected.endDate,
          productId: productId,
        })
        .then((response) => {
          setDialogButton("Aceptar");
          switch (response.status) {
            case 400:
              setOpenText("La fecha seleccionada no está disponible.");
              break;
            case 409:
              setOpenText("La fecha seleccionada no está disponible.");
              break;
            case 404:
              setOpenText(
                "Producto no encontrado. Intenta de nuevo más tarde."
              );
              break;
            case 401:
              setRedirectLogin(true);
              setDialogButton("Iniciar sesión");
              setOpenText("Inicia sesión o registrate para reservar.");
              break;
            case 200:
              setOpenText(
                "Reserva realizada correctamente. Toda la información ha sido enviada a su correo electrónico."
              );
              break;
            default:
              setOpenText("Error al realizar la reserva.");
              break;
          }
        });
      setDateSelected({});
      return;
    }
    setOpenText("");
    setDialogButton("Aceptar");
  };

  const handleCloseDialog = () => {
    setOpenText("");
    setDialogButton("Aceptar");
    if (redirectLoginRef.current) {
      window.location.href = "/login";
      return;
    }
  };

  const calculateRating = () => {
    if (reviews.length == 0) return 0;
    let sum = 0;
    for (let review of reviews) {
      sum += review.rating;
    }
    return sum / reviews.length;
  };

  const handleWhatsapp = () => {
    const phoneNumber = "14155238886"; // twilio number, to test
    const message = `Hola, estoy interesado en el producto ${product?.name || ""} que he visto en Bookify. ¿Podrías darme más información?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return !loading ? (
    <div className="container-fluid min-vh-100 p-0">
      <div className={mainClass}>
        <DialogText
          title={"Información"}
          text={openText}
          onClose={handleCloseDialog}
          onConfirm={handleConfirmDialog}
          buttonName={dialogButton}
        />
        <Share
          open={openShare}
          productId={getProductId()}
          onClose={() => setOpenShare(false)}
        />
        <DialogCarousel
          open={showGalery}
          images={images}
          initialIndex={index}
          handleClose={() => toggleGalery(-1)}
        />
        <DatePicker
          open={showDatePicker}
          onClose={(date) => handleSelectedDate(date)}
          onCancel={() => setShowDatePicker(false)}
          disabledDates={disabledDates}
          initialStart={dateSelected.startDate}
          initialEnd={dateSelected.endDate}
        />
        <AppBar sx={{ position: "relative", bgcolor: "#3498DB" }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {product?.name}
            </Typography>
            <Button autoFocus color="inherit" onClick={onClose}>
              <FontAwesomeIcon icon={faArrowLeft} size="lg" />
            </Button>
          </Toolbar>
        </AppBar>
        <div className="d-block p-4 bg-secondary">
          <div className="d-flex justify-content-center align-items-center gap-3 user-select-none">
            <img
              className="rounded image-effect main-image"
              src={images[0] || "https://via.placeholder.com/300"}
              onClick={() => toggleGalery(0)}
            />
            {images.length > 1 && (
              <ImageList
                sx={{
                  height: "auto",
                  width: "30%",
                  flexWrap: "nowrap",
                  transform: "translateZ(0)",
                  overflowX: "hidden",
                }}
                rowHeight={230}
                gap={5}
                variant="masonry"
                className="d-none d-lg-block"
              >
                {images.slice(1, 5).map((image) => (
                  <ImageListItem key={image} rows={1} cols={1}>
                    <img
                      className="rounded image-effect"
                      {...srcset(image)}
                      alt={product?.name}
                      loading="lazy"
                      onClick={() => toggleGalery(images.indexOf(image))}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            )}
          </div>
          <div className="d-flex justify-content-end mt-2">
            <button
              className="btn btn-primary text-white"
              onClick={showReservation}
            >
              <FontAwesomeIcon icon={faCalendar} /> Reservar
            </button>
            <button
              className="btn btn-outline-primary ms-3"
              onClick={() => toggleGalery(0)}
            >
              <FontAwesomeIcon icon={faCirclePlus} />
              <FontAwesomeIcon icon={faPhotoFilm} className="ms-2" />
            </button>
            <button
              className="btn btn-outline-primary ms-3"
              onClick={() => setOpenShare(true)}
            >
              <FontAwesomeIcon icon={faShare} />
            </button>
            <button
              className="btn btn-outline-danger ms-3"
              onClick={toggleProductWishlist}
            >
              <FontAwesomeIcon
                icon={
                  wishlist.find((it) => it == product.id)
                    ? faHeartSolid
                    : faHeartRegular
                }
              />
            </button>
            <button
              className="btn btn-outline-success ms-3"
              onClick={handleWhatsapp}
            >
              <FontAwesomeIcon icon={faWhatsapp} />
            </button>
          </div>
        </div>
        <div className="container">
          <hr></hr>
          <div className="row">
            <h5>
              <FontAwesomeIcon icon={faList} /> Descripción
            </h5>
          </div>

          <div className="row ms-1">{product?.description}</div>
          <hr></hr>

          <div className="row">
            <h5>
              <FontAwesomeIcon icon={faCirclePlus} /> Características
            </h5>
            {product?.features &&
              product.features.map((feature, index) => (
                <div className="col-sm-3 mt-2 mb-2" key={index}>
                  <div className="d-flex align-items-center">
                    <Icon color="primary">{feature[0]}</Icon>{" "}
                    <span style={{ marginLeft: "5px" }}>{feature[1]}</span>
                  </div>
                </div>
              ))}
          </div>
          <hr></hr>

          <div className="row">
            <h5>
              <FontAwesomeIcon icon={faComment} /> Opiniones
            </h5>

            <div className="col mt-2 mb-2 w-100" key={index}>
              <div className="d-flex justify-content-left">
                <div className="text-secondary border">
                  <ReviewSmall
                    reviews={reviews.length}
                    stars={calculateRating()}
                  />
                </div>
              </div>

              <hr></hr>

              <div>
                <h6>Reseñas de usuarios</h6>
              </div>
              {reviews.map((review, index) => (
                <div className="card" key={index}>
                  <div className="ps-3 pt-3">
                    <div className="d-flex align-items-center">
                      <div className="user-initial-circle">
                        {reviewers[review.userId]?.charAt(0)?.toUpperCase() ||
                          "S"}
                      </div>
                      <span className="ps-2">
                        <b>{reviewers[review.userId] || "Sin nombre"}</b>
                      </span>
                      <div>
                        <ReviewSmall stars={review.rating} />
                      </div>
                    </div>
                    <div className="ps-5 pt-1 pb-3">
                      <span>{review.comment}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <hr></hr>

          <div className="row">
            <h5>
              <FontAwesomeIcon icon={faLock} /> Políticas
            </h5>
            {product?.policies &&
              product.policies.map((policy, index) => (
                <div className="col-sm-3 mt-2 mb-2 ms-5 border" key={index}>
                  <div className="d-flex align-items-center text-secondary">
                    <FontAwesomeIcon size="xs" icon={faCircle} />
                    <b style={{ marginLeft: "5px" }}>{policy.title}</b>
                  </div>
                  <div className="row ms-3">{policy.description}</div>
                </div>
              ))}
          </div>
          <hr></hr>
        </div>
      </div>
    </div>
  ) : (
    <div className="container d-flex justify-content-center align-items-start pt-5 mt-5 min-vh-100">
      <HomeLoader />
    </div>
  );
}
