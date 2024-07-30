import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteProduct({
  product,
  confirmDelete,
  cancelDelete,
}) {
  const handleConfirm = () => {
    confirmDelete(product);
  };

  const handleClose = () => {
    cancelDelete();
  };

  return (
    <Dialog
      open={product != null}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Delete product confirmation."}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure you want to delete '{product?.name || "null"}' product?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained">
          Cancelar
        </Button>
        <Button onClick={handleConfirm} variant="contained" color="error">
          Borrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
