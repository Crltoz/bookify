import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCalendar,
  faCirclePlus,
  faList,
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

function isLogged() {
  return localStorage.getItem("token") != null;
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
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [dateSelected, setDateSelected] = React.useState({
    startDate: from,
    endDate: to,
  });
  const [disabledDates, setDisabledDates] = React.useState([]);

  const onClose = () => {
    // close the dialog, go back to the previous page in location
    window.history.back();
  };

  React.useEffect(() => {
    const productId = getProductId();

    if (!productId) return;
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

    axios.get("/users/wishlist").then((response) => {
      if (response.status != 200) return;
      setWishlist(response.data);
    });

    subscribe("updateProduct", updateProductEvent);
    subscribe("deleteProduct", deleteProductEvent);
    subscribe("updateWishlist", updateWishlistEvent);
    subscribe("updateReservation", updateReservationEvent);

    return () => {
      unsubscribe("updateProduct");
      unsubscribe("deleteProduct");
      unsubscribe("updateWishlist");
      unsubscribe("updateReservation");
    };
  }, []);

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

  React.useEffect(() => {
    setImages(product?.images || []);
  }, [product]);

  const toggleGalery = (index) => {
    setIndex(index);
    setShowGalery(index !== -1);
  };

  const toggleProductWishlist = () => {
    if (!isLogged()) {
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
    if (!isLogged()) {
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
      setOpenText(
        `¿Estás seguro que quieres reservar en las fechas seleccionadas? Son ${
          (endDate - startDate) / 1000 / 60 / 60 / 24
        } noches. Check-in: ${new Date(startDate).toLocaleDateString(
          "es-ES"
        )} Check-out: ${new Date(endDate).toLocaleDateString("es-ES")}`
      );
    }
    setShowDatePicker(false);
  };

  const handleConfirmDialog = () => {
    if (dateSelected.startDate && dateSelected.endDate) {
      const productId = getProductId();
      axios
        .post(`/products/reserve`, {
          start: dateSelected.startDate,
          end: dateSelected.endDate,
          productId: productId,
        })
        .then((response) => {
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
              setOpenText("Inicia sesión o registrate para reservar.");
              break;
            case 200:
              setOpenText("Reserva realizada correctamente.");
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
  };

  return !loading ? (
    <Dialog fullScreen open={product != null} onClose={onClose}>
      <DialogText
        title={"Información"}
        text={openText}
        onClose={() => setOpenText("")}
        onConfirm={handleConfirmDialog}
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
        </div>
      </div>
      <div className="container d-flex justify-content-center">
        <div className="w-100">
          <hr></hr>
          <div className="row m-3 mb-0">
            <h5>
              <FontAwesomeIcon icon={faList} /> Descripción
            </h5>
          </div>

          <div className="row m-4 mb-0 mt-0">{product?.description}</div>
          <hr></hr>

          <div className="row m-3 mb-0 d-flex">
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
        </div>
        <hr></hr>
      </div>
    </Dialog>
  ) : (
    <div className="container d-flex justify-content-center align-items-start pt-5 mt-5 min-vh-100">
      <HomeLoader />
    </div>
  );
}
