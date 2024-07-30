import React, { useState } from "react";
import "./css/Header.css";
import logo from "../assets/img/bookify-logo-big.webp";
import { Menu, MenuItem, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ListIcon from "@mui/icons-material/List";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminPanelSettingIcon from "@mui/icons-material/AdminPanelSettings";
import axios from "axios";

const Header = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const goToRegister = () => {
    window.location.href = "/register";
  };

  const goToLogin = () => {
    window.location.href = "/login";
  };

  const goToProfile = () => {
    handleClose();
    window.location.href = "/profile";
  };

  const goToReservations = () => {
    handleClose();
    window.location.href = "/reservations";
  };

  const goToAdminPanel = () => {
    handleClose();
    window.location.href = "/admin";
  };

  const handleLogout = () => {
    handleClose();
    window.localStorage.removeItem("token");
    axios.defaults.headers.common["Authorization"] = null;
    window.location.href = "/";
  };

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "";
  };

  return (
    <header className="header fixed-top">
      <div className="header-top container-fluid">
        <div className="d-flex justify-content-between align-items-center px-3 pt-2 pb-1">
          <div className="logo d-flex align-items-center">
            <a href="/">
              <img src={logo} alt="Logo" className="logo-img" />
            </a>
            <span className="d-none d-md-block ms-2">
              Explora, reserva y disfruta
            </span>
            {!user && (
              <span className="d-md-none d-block ms-2">
                Explora, reserva y disfruta
              </span>
            )}
          </div>
          {user ? (
            <div className="d-flex align-items-center">
              <span className="me-2">{user.name}</span>
              <div className="user-initial-circle" onClick={handleClick}>
                {getInitial(user.name)}
              </div>
              <Menu
                id="user-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                  paper: {
                    style: {
                      width: "20ch",
                    },
                  },
                }}
                disableScrollLock={true}
              >
                <div className="row">
                  <MenuItem onClick={goToProfile}>
                    <div className="col-lg-4 d-flex justify-content-left">
                      <IconButton>
                        <AccountCircleIcon />
                      </IconButton>
                    </div>
                    <div className="col d-flex justify-content-left">
                      <a>Perfil</a>
                    </div>
                  </MenuItem>
                </div>
                <div className="row">
                  <MenuItem onClick={goToReservations}>
                    <div className="col-lg-4 d-flex justify-content-left">
                      <IconButton>
                        <ListIcon />
                      </IconButton>
                    </div>
                    <div className="col d-flex justify-content-left">
                      <a>Reservas</a>
                    </div>
                  </MenuItem>
                </div>
                {user.isAdmin && (
                  <div className="row">
                    <MenuItem onClick={goToAdminPanel}>
                      <div className="col-lg-4 d-flex justify-content-left">
                        <IconButton>
                          <AdminPanelSettingIcon />
                        </IconButton>
                      </div>
                      <div className="col d-flex justify-content-left">
                        <a>Admin Panel</a>
                      </div>
                    </MenuItem>
                  </div>
                )}
                <div className="row">
                  <MenuItem onClick={handleLogout}>
                    <div className="col-lg-4 d-flex justify-content-left">
                      <IconButton>
                        <LogoutIcon />
                      </IconButton>
                    </div>
                    <div className="col d-flex justify-content-left">
                      <a>Salir</a>
                    </div>
                  </MenuItem>
                </div>
              </Menu>
            </div>
          ) : (
            <div className="header-buttons d-none d-lg-flex">
              <button
                className="btn btn-secondary create-account"
                onClick={goToRegister}
              >
                Crear cuenta
              </button>
              <button
                className="btn btn-primary text-white"
                onClick={goToLogin}
              >
                Iniciar sesión
              </button>
            </div>
          )}
        </div>
        {!user && (
          <div className="header-buttons d-lg-none d-lg-flex">
            <button
              className="btn btn-secondary create-account"
              onClick={goToRegister}
            >
              Crear cuenta
            </button>
            <button className="btn btn-primary text-white" onClick={goToLogin}>
              Iniciar sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
