import React, { useEffect, useState } from "react";
import "./css/Home.css";
import "./css/ProductInfo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faCalendarDays,
  faLocationPin,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import ProductInfo from "./ProductInfo";
import ProductEntry from "./ProductEntry";

const Home = ({ products }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [page, setPage] = useState(1);
  const [limitedProducts, setLimitedProducts] = useState([]);

  useEffect(() => {
    setLimitedProducts(products.slice(page * 10 - 10, page * 10));
    if (selectedItem) { 
      const selectedItemUpdated = products.find((product) => product.id === selectedItem.id);
      setSelectedItem(selectedItemUpdated);
    }
  }, [page, products]);

  const goToSearch = () => {
    window.location.href = "/search";
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className="container-fluid min-vh-100">
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
          <button className="btn btn-primary search-button text-white" onClick={goToSearch}>
            <FontAwesomeIcon icon={faSearch} /> Buscar
          </button>
        </div>
      </div>

      <ProductInfo product={selectedItem} onClose={() => setSelectedItem(null)} />
      <div className="recommendations mt-5">
        <h2 className="text-center title">Recomendaciones</h2>
        <div className="row justify-content-center mt-4">
          {limitedProducts.map((product) => (
            <div className="col-12 col-md-6 mb-4" key={product.id}>
              <ProductEntry
                product={product}
                onSelectItem={(product) => setSelectedItem(product)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="d-flex justify-content-center align-items-center mt-5">
        {page > 1 && (
          <button className="btn btn-primary" onClick={() => setPage(page - 1)}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        )}
        <span className="mx-3">
          Página {page}/{Math.ceil(products.length / 10)}
        </span>
        {page < Math.ceil(products.length / 10) && (
          <button
            className="btn btn-primary ms-2"
            onClick={() => setPage(page + 1)}
            disabled={page * 10 >= products.length}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
