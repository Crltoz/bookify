import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogText from "./DialogText";

export default function EditProduct({ open, onConfirm, onCancel, product }) {
  const [images, setImages] = React.useState([]);
  const [dialogText, setDialogText] = React.useState("");

  const addImage = () => {
    if (product && product.images) {
      product.images.push("");
      setImages([...product.images]);
    } else {
        setImages([...images, ""]);
    }
  };

  const onCloseDialogText = () => {
    setDialogText("");
  };

  return (
    <React.Fragment>
      <DialogText text={dialogText} onClose={onCloseDialogText} />
      <Dialog
        open={open}
        onClose={onCancel}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const newProduct = Object.fromEntries(formData.entries());
            newProduct.id = product?.id || "";
            newProduct.images = [];
            for (let key of Object.keys(newProduct)) {
              if (key.startsWith("image-")) {
                const value = newProduct[key];
                if (value.startsWith("http")) newProduct.images.push(value);
                //delete newProduct[key];
              }
            }

            if (newProduct.images.length === 0) {
                setDialogText("Debe agregar al menos una imagen.");
                return;
            }

            if (newProduct.name.length === 0) {
                setDialogText("Debe agregar un nombre al producto.");
                return;
            }

            if (newProduct.description.length === 0) {
                setDialogText("Debe agregar una descripción al producto.");
                return;
            }
            onConfirm(newProduct);
          },
        }}
      >
        <DialogTitle>Manager de Producto</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Aquí puedes seleccionar el nombre, descripción e imágenes del
            producto.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Nombre del producto"
            type="text"
            fullWidth
            variant="outlined"
            inputProps={{ defaultValue: product?.name || "" }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="description"
            name="description"
            label="Descripción del producto"
            type="text"
            fullWidth
            multiline
            variant="outlined"
            inputProps={{ defaultValue: product?.description || "" }}
          />
          {product?.images ? product.images.map((image, index) => (
            <TextField
              key={index}
              autoFocus
              margin="dense"
              id={`image-${index}`}
              name={`image-${index}`}
              label={`Imagen ${index + 1}`}
              type="text"
              fullWidth
              variant="outlined"
              helperText="URL de la imagen, dejar en blanco para eliminar."
              inputProps={{ defaultValue: image }}
            />
          )) : images.map((image, index) => (
            <TextField
              key={index}
              autoFocus
              margin="dense"
              id={`image-${index}`}
              name={`image-${index}`}
              label={`Imagen ${index + 1}`}
              type="text"
              fullWidth
              variant="outlined"
              helperText="URL de la imagen, dejar en blanco para eliminar."
              inputProps={{ defaultValue: image }}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={addImage} variant="contained" color="info">
            Añadir imagen
          </Button>
          <Button onClick={onCancel} variant="outlined" color="error">
            Cancelar
          </Button>
          <Button type="submit" variant="contained" color="success">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
