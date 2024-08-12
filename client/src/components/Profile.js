import React, { useEffect, useState } from "react";
import { Button, InputAdornment, TextField } from "@mui/material";
import { DialogActions, DialogContent, DialogContentText } from "@mui/material";
import {
  Email,
  AccountCircle,
  Password,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import axios from "axios";
import DialogText from "./DialogText";

const Profile = ({ user, onUpdate }) => {
  const [editNames, setEditNames] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [editableName, setEditableName] = useState("");
  const [editableLastName, setEditableLastName] = useState("");
  const [invalidPassword, setInvalidPassword] = useState("");
  const [invalidOldPassword, setInvalidOldPassword] = useState("");
  const [invalidName, setInvalidName] = useState("");
  const [invalidLastName, setInvalidLastName] = useState("");
  const [dialogText, setDialogText] = useState("");
  const [passwordType, setPasswordType] = useState("password");

  if (!user) {
    window.location.href = "/login";
    return;
  }

  useEffect(() => {
    setEditableName(user.name);
    setEditableLastName(user.lastName);
  }, [user.name, user.lastName]);

  const validatePassword = (password) => {
    const regex = /^.{8,}$/;
    return regex.test(password);
  };

  const validateName = (name) => {
    const regex = /^[a-zA-ZÀ-ÿ\s]+$/;
    return regex.test(name);
  };

  const handlePasswordChange = async (confirm) => {
    if (editPassword && confirm) {
      if (!validatePassword(password)) {
        setInvalidPassword("La contraseña debe tener al menos 8 caracteres.");
        return;
      }

      if (!validatePassword(oldPassword)) {
        setInvalidOldPassword(
          "La contraseña debe tener al menos 8 caracteres."
        );
        return;
      }

      setInvalidPassword("");
      setInvalidOldPassword("");
      const update = await axios.post("/users/update/password", {
        oldPassword: oldPassword,
        newPassword: password,
      });

      switch (update.status) {
        case 200: {
          setDialogText("Contraseña actualizada correctamente.");
          break;
        }
        case 400: {
          setInvalidPassword("La contraseña debe tener al menos 8 caracteres.");
          return;
        }
        case 418: {
          setInvalidOldPassword("La contraseña actual es incorrecta.");
          return;
        }
        case 401: {
          window.location.href = "/login";
          return;
        }
        case 404: {
          window.location.href = "/login";
          break;
        }
        default: {
          setInvalidPassword("Error desconocido. Intenta de nuevo más tarde.");
          break;
        }
      }

      setEditPassword(!editPassword);
      setPassword("");
      setOldPassword("");
      return;
    }

    if (!editPassword && confirm) {
      setEditPassword(!editPassword);
      return;
    }

    setInvalidPassword("");
    setInvalidOldPassword("");
    setPassword("");
    setOldPassword("");
    setEditPassword(!editPassword);
  };

  const handleNameChange = async (confirm) => {
    if (editNames && confirm) {
      if (!validateName(editableName)) {
        setInvalidName("El nombre solo puede contener letras.");
        return;
      }

      if (!validateName(editableLastName)) {
        setInvalidLastName("El apellido solo puede contener letras.");
        return;
      }

      setInvalidName("");
      setInvalidLastName("");

      if (editableName != name || editableLastName != lastName) {
        const update = await axios.post("/users/update/name", {
          firstName: editableName,
          lastName: editableLastName,
        });
        setEditNames(!editNames);

        switch (update.status) {
          case 200: {
            window.localStorage.setItem("token", update.data);
            onUpdate();
            break;
          }
          case 400: {
            setInvalidName("El nombre solo puede contener letras.");
            setInvalidLastName("El apellido solo puede contener letras.");
          }
          case 401: {
            window.location.href = "/login";
            break;
          }
          case 404: {
            window.location.href = "/login";
            break;
          }
          default: {
            setInvalidName("Error desconocido.");
            setInvalidLastName("Error desconocido.");
            break;
          }
        }
      } else setEditNames(!editNames);
      return;
    }

    if (!editNames && confirm) {
      setEditNames(!editNames);
      return;
    }

    setInvalidName("");
    setInvalidLastName("");
    setEditableName(user.name);
    setEditableLastName(user.lastName);
    setEditNames(!editNames);
  };

  const toggleShowPassword = () => {
    if (!editPassword) return;
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-primary margin-logged">
      <DialogText text={dialogText} onClose={() => setDialogText("")} onConfirm={() => setDialogText("")} />
      <div
        className="p-4 border rounded shadow-sm justify-content-center align-items-center bg-white"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h1 className="text-center mb-4">Perfil</h1>
        <DialogContent>
          <DialogContentText>
            Aquí están todos los datos relacionados a tu cuenta
          </DialogContentText>
          <TextField
            autoFocus
            disabled
            fullWidth
            margin="dense"
            id="email"
            name="email"
            label="Email"
            type="email"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
            value={user.email}
            helperText="El email no se puede cambiar."
          />
          <TextField
            autoFocus
            fullWidth
            disabled={!editNames}
            margin="dense"
            id="firstName"
            name="firstName"
            label="Nombre"
            type="text"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            value={editableName}
            helperText={invalidName}
            onChange={(e) => setEditableName(e.target.value)}
          />
          <TextField
            autoFocus
            fullWidth
            disabled={!editNames}
            margin="dense"
            id="lastName"
            name="lastName"
            label="Apellido"
            type="text"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            value={editableLastName}
            helperText={invalidLastName}
            onChange={(e) => setEditableLastName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          {editNames && (
            <Button
              variant="outlined"
              color="info"
              onClick={() => handleNameChange(false)}
            >
              {"Cancelar"}
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleNameChange(true)}
          >
            {editNames ? "Guardar nombres" : "Editar nombres"}
          </Button>
        </DialogActions>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            disabled={!editPassword}
            margin="dense"
            id="oldPassword"
            name="oldPassword"
            label="Contraseña actual"
            type={passwordType}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Password />
                </InputAdornment>
              ),
              endAdornment: (
                <div style={{ cursor: "pointer" }} onClick={toggleShowPassword}>
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
            placeholder="********"
            helperText={invalidOldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            value={oldPassword}
          />
          <TextField
            autoFocus
            fullWidth
            disabled={!editPassword}
            margin="dense"
            id="password"
            name="password"
            label="Contraseña nueva"
            type={passwordType}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Password />
                </InputAdornment>
              ),
              endAdornment: (
                <div style={{ cursor: "pointer" }} onClick={toggleShowPassword}>
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
            placeholder="********"
            helperText={invalidPassword}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </DialogContent>
        <DialogActions>
          {editPassword && (
            <Button
              variant="outlined"
              color="info"
              onClick={() => handlePasswordChange(false)}
            >
              {"Cancelar"}
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={() => handlePasswordChange(true)}
          >
            {editPassword ? "Guardar contraseña" : "Cambiar contraseña"}
          </Button>
        </DialogActions>
      </div>
    </div>
  );
};

export default Profile;
