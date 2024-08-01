import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCirclePlus,
  faList,
  faPhotoFilm,
} from "@fortawesome/free-solid-svg-icons";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import "./css/ProductInfo.css";
import DialogCarousel from "./DialogCarousel";
import { Icon } from "@mui/material";
import axios from "axios";
import { subscribe, unsubscribe } from "../events";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

function srcset(image) {
  return {
    src: `${image || "https://via.placeholder.com/300"}`,
    srcSet: `${image || "https://via.placeholder.com/300"}`,
  };
}

function getProductId() {
  return window.location.pathname.split("/")[2];
}

export default function ProductInfo() {
  const [images, setImages] = React.useState([]);
  const [index, setIndex] = React.useState(-1);
  const [product, setProduct] = React.useState(null);
  const [showGalery, setShowGalery] = React.useState(false);

  const onClose = () => {
    // close the dialog, go back to the previous page in location
    window.history.back();
  };

  React.useEffect(() => {
    // the client here is in url http://localhost:3000/product/:id
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

  return (
    <Dialog
      fullScreen
      open={product != null}
      onClose={onClose}
      TransitionComponent={Transition}
    >
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
            <FontAwesomeIcon icon={faCirclePlus} className="me-2" />
            <FontAwesomeIcon icon={faPhotoFilm} className="me-2" />
          </button>
        </div>
      </div>
      <hr></hr>
      <div className="container-fluid">
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
        <hr></hr>
      </div>
    </Dialog>
  );
}
