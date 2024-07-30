import React from "react";
import "./css/Header.css";
import logo from "../assets/img/bookify-logo-big.webp";

const Header = () => {
  const goToRegister = () => {
    window.location.href = "/register";
  };

  return (
    <header className="header fixed-top">
      <div className="header-top container-fluid">
        <div className="d-flex justify-content-between align-items-center px-3 pt-2 pb-1">
          <div className="logo d-flex align-items-center">
            <a href="/"><img src={logo} alt="Logo" className="logo-img" /></a>
            <span className="d-lg-block ms-2">Explora, reserva y disfruta</span>
          </div>
          <div className="header-buttons d-none d-lg-flex">
            <button className="btn btn-secondary create-account" onClick={goToRegister}>Crear cuenta</button>
            <button className="btn btn-primary text-white">Iniciar sesión</button>
          </div>
        </div>
        <div className="header-buttons d-lg-none d-lg-flex">
            <button className="btn btn-secondary create-account" onClick={goToRegister}>Crear cuenta</button>
            <button className="btn btn-primary text-white">Iniciar sesión</button>
          </div>
      </div>
    </header>
  );
};

export default Header;