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
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import "./css/ProductInfo.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

function srcset(image, width, height, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${
      height * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function ProductInfo({ product, onClose }) {
  const [images, setImages] = React.useState([]);

  React.useEffect(() => {
    setImages(product?.images || []);
  }, [product]);

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={product != null}
        onClose={onClose}
        TransitionComponent={Transition}
      >
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
        <div className="d-flex p-4 justify-content-center gap-3 bg-secondary user-select-none">
          <img className="rounded image-effect" src={images[0]} width="30%" height="95%" />
          {images.length > 1 && (
            <ImageList
              sx={{
                height: "100%",
                width: "20%",
                flexWrap: "nowrap",
                transform: "translateZ(0)",
                overflowX: "hidden",
              }}
              rowHeight={230}
              gap={5}
              variant="masonry"
            >
              {images.slice(1, 5).map((image) => (
                <ImageListItem key={image} rows={1} cols={1}>
                  <img
                    className="rounded image-effect"
                    {...srcset(image, 200, 150, 1, 1)}
                    alt={product?.name}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          )}
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
