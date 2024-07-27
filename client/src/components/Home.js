import React from "react";
import "./css/Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faLocationPin,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

const Home = ({ products }) => {
  return (
    <div className="container-fluid">
      <div className="header-bottom">
        <h1 className="text-center">
          Encuentra las mejores ofertas en casas, hoteles y más
        </h1>
        <div className="search-bar d-flex flex-column flex-lg-row justify-content-center align-items-center">
          <div className="d-flex align-items-center mb-3 mb-lg-0">
            <FontAwesomeIcon icon={faLocationPin} className="me-2" size="lg" />
            <input
              type="text"
              className="form-control me-2"
              placeholder="¿A dónde vamos?"
            />
          </div>
          <div className="d-flex align-items-center mb-3 mb-lg-0">
            <FontAwesomeIcon icon={faCalendarDays} className="me-2" size="lg" />
            <input
              type="text"
              className="form-control me-2"
              placeholder="Check in - Check out"
            />
          </div>
          <button className="btn btn-primary search">
            <FontAwesomeIcon icon={faSearch} /> Buscar
          </button>
        </div>
      </div>

      <div className="products mt-5">
        <h2 className="text-center">Descubre nuestros productos</h2>
        <div className="row mt-4">
          {products &&
            products.map((product) => (
              <div className="col-12 col-md-6 col-lg-4 mb-4">
                <div className="card">
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text">
                      <small className="text-muted">
                        Desde ${product.price}
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
