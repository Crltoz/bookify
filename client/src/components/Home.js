import React, { useState } from "react";
import "./css/Home.css";
import "./css/ProductInfo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faLocationPin, faSearch } from "@fortawesome/free-solid-svg-icons";
import ProductInfo from "./ProductInfo";

const Home = ({ products }) => {
  if (!products) products = []
  const limitedProducts = products.slice(0, 10);

  const [selectedItem, setSelectedItem] = useState(null);

  const onSelectItem = (product) => () => {
    setSelectedItem(product);
  }

  return (
    <div className="container-fluid">
      <div className="header-bottom text-center">
        <h1>Encuentra las mejores ofertas en casas, hoteles y más</h1>
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


      <ProductInfo product={selectedItem} onClose={onSelectItem(null)} />
      <div className="recommendations mt-5">
        <h2 className="text-center title">Recomendaciones</h2>
        <div className="row justify-content-center mt-4">
          {limitedProducts.map((product) => (
            <div className="col-12 col-md-6 mb-4" key={product.name}>
  
              <div className="card d-lg-flex flex-row d-none">
                <img
                  src={product.images[0] || "https://via.placeholder.com/300"}
                  className="card-img-left user-select-none rounded image-effect"
                  alt={product.name}
                  onClick={onSelectItem(product)}
                />
                <div className="card-body d-flex flex-column justify-content-between align-items-center">
                  <h5 className="card-title" onClick={onSelectItem(product)}>{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <button href={product.link} className="btn btn-outline-success">
                    <FontAwesomeIcon icon={faLocationPin} className="me-2" />
                    Ubicación
                  </button>
                </div>
              </div>

              <div className="card d-lg-none">
                <img
                  src={product.images[0] || "https://via.placeholder.com/300"}
                  className="card-img-top user-select-none rounded image-effect"
                  alt={product.name}
                  onClick={onSelectItem(product)}
                />
                <div className="card-body">
                  <h5 className="card-title" onClick={onSelectItem(product)}>{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <button href={product.link} className="btn btn-outline-success">
                    <FontAwesomeIcon icon={faLocationPin} className="me-2" />
                    Ubicación
                  </button>
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