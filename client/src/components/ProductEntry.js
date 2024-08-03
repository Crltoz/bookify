import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationPin } from "@fortawesome/free-solid-svg-icons";


const ProductEntry = ({ product, onSelectItem }) => {
  return (
    <div className="col-sm-auto mb-4" key={product.name}>
      <div className="card d-lg-flex flex-row d-none">
        <img
          src={product.images[0] || "https://via.placeholder.com/300"}
          className="card-img-left user-select-none rounded image-effect"
          alt={product.name}
          onClick={() => onSelectItem(product)}
        />
        <div className="card-body d-flex flex-column justify-content-between align-items-center">
          <h5 className="card-title" onClick={() => onSelectItem(product)}>
            {product.name}
          </h5>
          <p className="card-text">{product.description}</p>
          <button href={product.link} className="btn btn-outline-success">
            <FontAwesomeIcon icon={faLocationPin} className="me-2" />
            { product.address.country + ", " + product.address.city }
          </button>
        </div>
      </div>

      <div className="card d-lg-none">
        <img
          src={product.images[0] || "https://via.placeholder.com/300"}
          className="card-img-top user-select-none rounded image-effect"
          alt={product.name}
          onClick={() => onSelectItem(product)}
        />
        <div className="card-body">
          <h5 className="card-title" onClick={() => onSelectItem(product)}>
            {product.name}
          </h5>
          <p className="card-text">{product.description}</p>
          <button href={product.link} className="btn btn-outline-success">
            <FontAwesomeIcon icon={faLocationPin} className="me-2" />
            Ubicación
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductEntry;