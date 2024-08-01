import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Grid,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const shareText = "¡Mira este producto de Bookify! ";
const baseURL = window.location.origin;

const Share = ({ open, onClose, productId }) => {
    const shareUrl = `${baseURL}/productCard?id=${productId}`;

  const handleShareTwitter = () => {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank");
  };

  const handleShareEmail = () => {
    const subject = "Mira este producto en Bookify";
    const body = `Ey,\n\nEstuve revisando hoteles y lugares para reservar en Bookify. Mira este: ${shareUrl}\n\n¡Nos vemos!`;
    const url = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
  };

  const handleShareFacebook = () => {
    const url = `http://www.facebook.com/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank");
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Share this page</DialogTitle>
      <DialogContent>
        <Grid container spacing={3} justifyContent="center">
          <Grid item>
            <IconButton onClick={handleShareTwitter} color="primary">
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton onClick={handleShareEmail} color="primary">
              <FontAwesomeIcon icon={faEnvelope} size="2x" />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton onClick={handleShareFacebook} color="primary">
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </IconButton>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default Share;
