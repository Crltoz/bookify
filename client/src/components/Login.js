import axios from "axios";
import React, { useState } from "react";
import DialogText from "./DialogText";
import { Button, InputAdornment, TextField } from "@mui/material";
import { DialogActions, DialogContent, DialogContentText } from "@mui/material";
import {
  Email,
  Password,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

const Login = ({ isLogged }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidEmail, setInvalidEmail] = useState("");
  const [invalidPassword, setInvalidPassword] = useState("");
  const [dialogText, setDialogText] = useState("");
  const [passwordType, setPasswordType] = useState("password");

  if (isLogged) {
    window.location.href = "/";
    return;
  }

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^.{8,}$/;
    return regex.test(password);
  };

  const onLogin = () => {
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

    axios
      .post("/users/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        switch (response.status) {
          case 200: {
            // set the token in the local storage and in axios headers
            window.localStorage.setItem("token", response.data);
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${response.data}`;

            window.location.href = "/";
            break;
          }
          case 401: {
            setDialogText("Email o contraseña incorrectos.");
            break;
          }
          case 404: {
            setDialogText("Email o contraseña incorrectos.");
            break;
          }
          case 409: {
            setDialogText(
              "Demasiados intentos de inicio de sesión. Espera unos minutos antes de intentar de nuevo."
            );
            break;
          }
          default: {
            setDialogText("Error al intentar iniciar sesión.");
            break;
          }
        }
      })
      .catch((e) => {
        console.error(e);
        setDialogText("Error al intentar iniciar sesión.");
      });
  };

  const toggleShowPassword = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-center min-vh-100 bg-primary mt-5">
        <DialogText text={dialogText} onClose={() => setDialogText("")} />
        <div
          className="p-4 border rounded shadow-sm justify-content-center align-items-center bg-white"
          style={{ width: "100%", maxWidth: "400px" }}
        >
          <h1 className="text-center mb-4">Iniciar sesión</h1>
          <DialogContent>
            <DialogContentText>
              Ingresa tus datos para entrar a tu cuenta.
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
              type={passwordType}
              variant="filled"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Password />
                  </InputAdornment>
                ),
                endAdornment: (
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={toggleShowPassword}
                  >
                    <InputAdornment position="end">
                      {passwordType === "password" ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </InputAdornment>
                  </div>
                ),
              }}
              helperText={invalidPassword}
              onChange={(e) => setPassword(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary" onClick={onLogin}>
              Ingresar
            </Button>
          </DialogActions>
        </div>
      </div>
    </div>
  );
};

export default Login;
