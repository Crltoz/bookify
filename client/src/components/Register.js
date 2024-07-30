import React, { useState } from "react";
import { Button, InputAdornment, TextField } from "@mui/material";
import { DialogActions, DialogContent, DialogContentText } from "@mui/material";
import { AccountCircle, Email, Password } from "@mui/icons-material";
import axios from "axios";
import DialogText from "./DialogText";

const Register = () => {
  const [invalidEmail, setInvalidEmail] = useState("");
  const [invalidPassword, setInvalidPassword] = useState("");
  const [invalidName, setInvalidName] = useState("");
  const [invalidLastName, setInvalidLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dialogText, setDialogText] = useState("");
  const [waitingAfterRegister, setWaitingAfterRegister] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^.{8,}$/;
    return regex.test(password);
  };

  const validateName = (name) => {
    const regex = /^[a-zA-ZÀ-ÿ\s]+$/;
    return regex.test(name);
  };

  const onRegister = () => {
    if (!validateEmail(email)) {
      setInvalidEmail("Debe ingresar un email válido.");
      return;
    }
    setInvalidEmail("");

    if (!validatePassword(password)) {
      setInvalidPassword("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    setInvalidPassword("");

    if (!validateName(name)) {
      setInvalidName("El nombre solo puede contener letras.");
      return;
    }
    setInvalidName("");

    if (!validateName(lastName)) {
      setInvalidLastName("El apellido solo puede contener letras.");
      return;
    }
    setInvalidLastName("");

    axios
      .post("/users/register", {
        email: email,
        password: password,
        firstName: name,
        lastName: lastName,
      })
      .then((response) => {
        switch (response.status) {
          case 201: {
            setWaitingAfterRegister(true);
            setDialogText(
              "Cuenta creada correctamente, ¡gracias por pertenecer a Bookify! Presiona ACEPTAR para continuar."
            );

            // set the token in the local storage and in axios headers
            window.localStorage.setItem("token", response.data);
            axios.defaults.headers.common["Authorization"] = `Bearer ${response.data}`;
            break;
          }
          case 400: {
            // this case must not happen because the frontend already validates the inputs
            setDialogText(
              "Ingresaste un parámetro (email, contraseña, nombre o apellido) inválido. Intenta nuevamente por favor."
            );
            break;
          }
          case 409: {
            setInvalidEmail("Este email ya está registrado.");
            setDialogText("El email ingresado ya está registrado.");
            break;
          }
          case 429: {
            setDialogText(
              "Has intentado crear demasiadas cuentas. Intenta de nuevo más tarde."
            );
            break;
          }
          default: {
            setDialogText(
              "Error al crear la cuenta. Intentalo de nuevo más tarde."
            );
            console.error(response);
            break;
          }
        }
      })
      .catch((error) => {
        setDialogText(
          "Error al crear la cuenta. Intentalo de nuevo más tarde."
        );
        console.error(error);
      });
  };

  const handleDialogClose = () => {
    if (waitingAfterRegister) {
      window.location.href = "/";
    }
    setDialogText("");
  };

  return (
    <React.Fragment>
      <div>
        <div className="d-flex align-items-center justify-content-center min-vh-100 bg-primary">
          <DialogText text={dialogText} onClose={handleDialogClose} />
          <div
            className="p-4 border rounded shadow-sm justify-content-center align-items-center bg-white"
            style={{ width: "100%", maxWidth: "400px" }}
          >
            <h1 className="text-center mb-4">Crear cuenta</h1>
            <DialogContent>
              <DialogContentText>
                Bienvenido a la página de registro. Por favor, ingresa tus datos
                para crear una cuenta.
              </DialogContentText>
              <TextField
                autoFocus
                required
                fullWidth
                error={invalidEmail.length > 0}
                margin="dense"
                id="email"
                name="email"
                label="Email"
                type="email"
                variant="filled"
                helperText={invalidEmail}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                autoFocus
                fullWidth
                required
                margin="dense"
                id="password"
                name="password"
                label="Contraseña"
                type="password"
                variant="filled"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Password />
                    </InputAdornment>
                  ),
                }}
                helperText={invalidPassword}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                autoFocus
                fullWidth
                required
                margin="dense"
                id="name"
                name="name"
                label="Nombre"
                type="text"
                variant="filled"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
                helperText={invalidName}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                autoFocus
                fullWidth
                required
                margin="dense"
                id="lastName"
                name="lastName"
                label="Apellido"
                type="text"
                variant="filled"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
                helperText={invalidLastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button variant="contained" color="primary" onClick={onRegister}>
                Registrar
              </Button>
            </DialogActions>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Register;
