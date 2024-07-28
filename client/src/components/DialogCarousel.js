import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Fade } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />;
});

const DialogCarousel = ({ images, handleClose, initialIndex, open }) => {
  const [index, setIndex] = useState(-1);

  const handleNext = () => {
    setIndex((index + 1) % images.length);
  };

  const handlePrev = () => {
    setIndex((index - 1 + images.length) % images.length);
  };

  const onClose = () => {
    handleClose();
  };

  useEffect(() => {
    if (initialIndex == -1) return;
    setIndex(initialIndex);
  }, [initialIndex]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <DialogContent>
        <h2>Galería</h2>
        <div className="row">
          <img src={images[index]} alt="carousel" />
        </div>
        <div className="row">
          <div className="col d-flex justify-content-center">
            <IconButton onClick={handlePrev}>
              <ChevronLeft />
            </IconButton>
          </div>
          <div className="col d-flex justify-content-center">
            <p>
              {index + 1} / {images.length}
            </p>
          </div>
          <div className="col d-flex justify-content-center">
            <IconButton onClick={handleNext}>
              <ChevronRight />
            </IconButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogCarousel;
