import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/img/bookify-logo-big.webp";

const Loading = () => {
  return (
    <div className="position-absolute d-flex flex-column justify-content-center align-items-center min-vh-100 w-100 bg-primary text-white">
      <div>
        <img
          src={logo}
          className="bg-secondary rounded mt-5"
          width="150px"
          alt="Bookify"
        />
      </div>
      <FontAwesomeIcon className="mt-5" icon={faSpinner} spin size="3x" />
    </div>
  );
};

export default Loading;
