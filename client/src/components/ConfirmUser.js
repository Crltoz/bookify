import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import axios from "axios";
import DialogText from "./DialogText";

const ConfirmUser = () => {
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState(false);
  const [waitingAfterConfirm, setWaitingAfterConfirm] = useState(false);

  const confirmUser = async () => {
    try {
      // get token from the UR
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      const response = await axios.get("/users/confirm/" + token);
      if (response.status == 200) {
        setWaitingAfterConfirm(true);
        setConfirmed(true);
      } else {
        setError(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDialogClose = () => {
    if (waitingAfterConfirm) {
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    confirmUser();
  }, []);

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <DialogText
        text={
          confirmed
            ? "¡Su cuenta fue confirmada correctamente! Ya puede iniciar sesión para acceder a su cuenta."
            : ""
        }
        onClose={handleDialogClose}
        onConfirm={handleDialogClose}
      />
      {error && (
        <h1 className="text-center">
          Hubo un error al confirmar tu cuenta. Intentalo de nuevo más tarde.
        </h1>
      )}
      {confirmed && (
        <h1 className="text-center">Tu cuenta ha sido confirmada.</h1>
      )}
      {!confirmed && !error && (
        <h1 className="text-center">
          <FontAwesomeIcon icon={faSpinner} spin /> Confirmando tu cuenta...
        </h1>
      )}
    </div>
  );
};

export default ConfirmUser;
