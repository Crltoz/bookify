import React from "react";
import "./css/Header.css";
import logo from "../assets/img/bookify-logo-big.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faLocationPin, faSearch } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <header className="header fixed-top">
      <div className="header-top container-fluid">
        <div className="d-flex justify-content-between align-items-center px-3 pt-2 pb-1">
          <div className="logo d-flex align-items-center">
            <a href="/"><img src={logo} alt="Logo" className="logo-img" /></a>
            <span className="d-lg-block ms-2">Explora, reserva y disfruta</span>
          </div>
          <div className="header-buttons d-none d-lg-flex">
            <button className="btn btn-secondary create-account">Crear cuenta</button>
            <button className="btn btn-primary login">Iniciar sesión</button>
          </div>
        </div>
        <div className="header-buttons d-lg-none d-lg-flex">
            <button className="btn btn-secondary create-account">Crear cuenta</button>
            <button className="btn btn-primary login">Iniciar sesión</button>
          </div>
      </div>
    </header>
  );
};

export default Header;