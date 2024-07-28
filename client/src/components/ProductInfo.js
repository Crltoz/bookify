import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCirclePlus,
  faPhotoFilm,
} from "@fortawesome/free-solid-svg-icons";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import "./css/ProductInfo.css";
import DialogCarousel from "./DialogCarousel";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

function srcset(image) {
  return {
    src: `${image}`,
    srcSet: `${image}`,
  };
}

export default function ProductInfo({ product, onClose }) {
  const [images, setImages] = React.useState([]);
  const [index, setIndex] = React.useState(-1);
  const [showGalery, setShowGalery] = React.useState(false);

  React.useEffect(() => {
    setImages(product?.images || []);
  }, [product]);

  const toggleGalery = (index) => {
    setIndex(index);
    setShowGalery(index !== -1);
  };

  return (
    <React.Fragment>
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
              src={images[0]}
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
            <button className="btn btn-outline-primary" onClick={() => toggleGalery(0)}>
              <FontAwesomeIcon icon={faCirclePlus} className="me-2" />
              <FontAwesomeIcon icon={faPhotoFilm} className="me-2" />
            </button>
          </div>
        </div>
        <List>
          <ListItemButton
            variant="raised"
            style={{ backgroundColor: "transparent", cursor: "default" }}
            disableRipple
            disableTouchRipple
          >
            <ListItemText
              primary="Descripción"
              secondary={product?.description}
            />
          </ListItemButton>
          <Divider />
        </List>
      </Dialog>
    </React.Fragment>
  );
}
