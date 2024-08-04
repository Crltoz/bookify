import React from "react";
import "./css/Footer.css";
import logo from "../assets/img/bookify-logo-big.webp";

const Footer = () => {
  return (
    <footer className="container-fluid footer">
      <div className="row lg-2">
        <div className="col d-flex justify-content-start">
          <img src={logo} alt="Bookify" height="30" />
          <p className="ms-3">© 2024 </p>
        </div>
        <div className="col d-flex justify-content-end">
          <p>Contáctanos</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
