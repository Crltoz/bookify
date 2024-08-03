import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
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
import Loading from "../Loading";
import ProductInfoLoader from "./ProductInfoLoader";
import Share from "./Share";

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

export default function ProductInfo() {
  const [images, setImages] = React.useState([]);
  const [index, setIndex] = React.useState(-1);
  const [product, setProduct] = React.useState(null);
  const [showGalery, setShowGalery] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [openShare, setOpenShare] = React.useState(false);
  const [wishlist, setWishlist] = React.useState([]);

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

    return () => {
      unsubscribe("updateProduct");
      unsubscribe("deleteProduct");
    };
  }, []);

  React.useEffect(() => {
    setImages(product?.images || []);
  }, [product]);

  const toggleGalery = (index) => {
    setIndex(index);
    setShowGalery(index !== -1);
  };

  const toggleProductWishlist = () => {
    const productId = getProductId();

    if (wishlist.find((it) => it == productId) != null) {
      axios.delete(`/users/wishlist/remove/${productId}`).then(() => {
        setWishlist(wishlist.filter((it) => it != productId));
      });
    } else {
      axios.post(`/users/wishlist/add/${productId}`).then(() => {
        setWishlist([...wishlist, productId]);
      });
    }
  };

  const updateProductEvent = ({ detail }) => {
    const productId = detail;
    if (getProductId() === productId) {
      try {
        axios.get(`/products/get/${productId}`).then((response) => {
          if (response.status != 200) return;
          setProduct(response.data);
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  const deleteProductEvent = ({ detail }) => {
    const productId = detail;
    if (getProductId() === productId) {
      onClose();
      return;
    }
  };

  return !loading ? (
    <Dialog fullScreen open={product != null} onClose={onClose}>
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
            className="btn btn-outline-primary"
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
    <div className="container-fluid d-flex justify-content-center align-items-start pt-5 mt-5 min-vh-100">
      <ProductInfoLoader />
    </div>
  );
}
