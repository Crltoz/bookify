import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogText from "./DialogText";

export default function EditCategory({ open, onConfirm, onCancel, category }) {
  const [dialogText, setDialogText] = React.useState("");

  const onCloseDialogText = () => {
    setDialogText("");
  };

  return (
    <>
      <DialogText text={dialogText} onClose={onCloseDialogText} />
      <Dialog
        open={open}
        onClose={onCancel}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const newCategory = Object.fromEntries(formData.entries());
            newCategory.id = category?.id || "";

            if (newCategory.name.length === 0) {
              setDialogText("Debe agregar un nombre a la categoría.");
              return;
            }

            if (newCategory.description.length === 0) {
              setDialogText("Debe agregar una descripción a la categoría.");
              return;
            }
            onConfirm(newCategory);
          },
        }}
      >
        <DialogTitle>Manager de Categoría</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Aquí puedes seleccionar el nombre y descripción de la categoría.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Nombre de la categoría"
            type="text"
            fullWidth
            variant="outlined"
            inputProps={{ defaultValue: category?.name || "" }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="description"
            name="description"
            label="Descripción de la categoría"
            type="text"
            fullWidth
            multiline
            variant="outlined"
            inputProps={{ defaultValue: category?.description || "" }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="image"
            name="image"
            label="Imagen de la categoría"
            type="text"
            fullWidth
            multiline
            variant="outlined"
            inputProps={{ defaultValue: category?.image || "" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} variant="outlined" color="error">
            Cancelar
          </Button>
          <Button type="submit" variant="contained" color="success">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
