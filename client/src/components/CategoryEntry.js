import { faBed } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const CategoryEntry = ({ category, onSelectCategory }) => {
  return (
    <div className="col-sm-auto mb-4" key={category.name}>
      <div className="card d-none d-lg-flex">
        <div className="d-flex justify-content-center">
          <img
            src={category.image || "https://via.placeholder.com/300"}
            className="card-img-center user-select-none rounded image-effect mt-3"
            alt={category.name}
            onClick={() => onSelectCategory(category)}
          />
        </div>
        <div className="card-body d-flex flex-column justify-content-between align-items-center">
          <h5 className="card-title" onClick={() => onSelectCategory(category)}>
            {category.name}
          </h5>
          <p className="card-text">{category.description}</p>
        </div>
        <div className="card-footer">
          <span>
            <FontAwesomeIcon className="text-info" icon={faBed} /> {category.products.length}{" "}
            disponibles
          </span>
        </div>
      </div>

      <div className="card d-lg-none">
        <img
          src={category.image || "https://via.placeholder.com/300"}
          className="card-img-top user-select-none rounded image-effect"
          alt={category.name}
          onClick={() => onSelectCategory(category)}
        />
        <div className="card-body">
          <h5 className="card-title" onClick={() => onSelectCategory(category)}>
            {category.name}
          </h5>
          <p className="card-text">{category.description}</p>
        </div>
        <div className="card-footer">
          <span>
            <FontAwesomeIcon className="text-info" icon={faBed} /> {category.products.length}{" "}
            disponibles
          </span>
        </div>
      </div>
    </div>
  );
};

export default CategoryEntry;
