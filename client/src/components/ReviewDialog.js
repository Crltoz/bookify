import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  DialogContentText,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const ReviewDialog = ({ open, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleMouseEnter = (ratingValue) => {
    setHoverRating(ratingValue);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (ratingValue) => {
    setRating(ratingValue);
  };

  const handleSubmit = () => {
    onSubmit({ rating, comment });
    setRating(0);
    setComment("");
    onClose();
  };

  const handleClose = () => {
    setRating(0);
    setComment("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>¡Deja un comentario!</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Califica el lugar y deja un comentario para ayudar a otros usuarios.
        </DialogContentText>
        <div className="d-flex justify-content-center align-items-center mb-2 mt-2">
          {[...Array(5)].map((star, index) => {
            const ratingValue = index + 1;
            return (
              <span
                key={index}
                onMouseEnter={() => handleMouseEnter(ratingValue)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(ratingValue)}
                style={{ cursor: "pointer" }}
              >
                <FontAwesomeIcon
                  icon={faStar}
                  size="lg"
                  color={
                    ratingValue <= (hoverRating || rating)
                      ? "#ffc107"
                      : "#e4e5e9"
                  }
                />
              </span>
            );
          })}
        </div>
        <TextField
          label="Comentario"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Enviar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewDialog;
