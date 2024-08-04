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
import ProductEntry from "./ProductEntry";
import HomeLoader from "./HomeLoader";
import axios from "axios";
import { Autocomplete, TextField, createFilterOptions } from "@mui/material";
import { Box } from "@mui/system";
import CategoryEntry from "./CategoryEntry";
import DatePicker from "./DatePicker";

const isLogged = () => {
  return window.localStorage.getItem("token") != null;
}

const Home = ({ products }) => {
  const [page, setPage] = useState(1);
  const [limitedProducts, setLimitedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [dateSelected, setDateSelected] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);

  const mainClass = isLogged() ? "margin-logged" : "margin-not-logged";
  console.log(mainClass)

  const defaultFilterOptions = createFilterOptions();

  useEffect(() => {
    axios
      .get("/products/addresses")
      .then((response) => {
        setAddresses(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get("/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    setLimitedProducts(products.slice(page * 10 - 10, page * 10));

    setTimeout(() => {
      // give time to load the products
      setLoading(false);
    }, 1000);
  }, [page, products]);

  const filterOptions = (options, state) => {
    return defaultFilterOptions(options, state).slice(0, 10);
  };

  const goToSearch = () => {
    const query = "?query=" + search
    const fromDate = dateSelected.startDate ? `&from=${dateSelected.startDate.getTime()}` : "";
    const toDate = dateSelected.endDate ? `&to=${dateSelected.endDate.getTime()}` : "";

    window.location.href = "/search" + query + fromDate + toDate;
  };

  const onSelectItem = (product) => {
    window.location.href = `/product?id=${product.id}`;
  };

  const handleSelectCategory = React.useCallback((category) => {
    window.location.href = `/search?query=${category.name}`;
  }, []);

  const handleSelectedDate = (date) => {
    if (date[0]) setDateSelected(date[0]);
    setShowDatePicker(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className={"container min-vh-100 " + mainClass}>
      <div className="header-bottom text-center">
        <h1>Encuentra las mejores ofertas en casas, hoteles y más</h1>
        <div className="search-bar d-flex flex-column flex-lg-row justify-content-center align-items-center">
          <div className="d-flex align-items-center mb-3 mb-lg-0">
            <FontAwesomeIcon icon={faLocationPin} className="me-2" size="lg" />
            <Autocomplete
              id="search"
              sx={{ width: 300, backgroundColor: "white", borderRadius: "5px" }}
              fullWidth
              disablePortal
              options={addresses.map(
                (address) => `${address.country}, ${address.city}`
              )}
              value={search}
              noOptionsText="No hay resultados"
              filterOptions={filterOptions}
              onChange={(event, value) => setSearch(value || "")}
              isOptionEqualToValue={(option, value) =>
                option?.country?.toLowerCase() ==
                  value?.country?.toLowerCase() ||
                option?.city?.toLowerCase() == value?.city?.toLowerCase()
              }
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ "& > span": { mr: 2, flexShrink: 0 } }}
                  {...props}
                  key={option}
                >
                  <FontAwesomeIcon
                    icon={faLocationPin}
                    className="me-2 text-success"
                  />
                  {option}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={search.length === 0 ? "¿A dónde vamos?" : ""}
                  id="search"
                  type="text"
                  InputLabelProps={{
                    shrink: false,
                    disabled: true,
                  }}
                  onChange={(event) => setSearch(event.target.value)}
                  size="small"
                />
              )}
            />
          </div>
          <div className="d-flex align-items-center mb-3 mb-lg-0">
            <FontAwesomeIcon icon={faCalendarDays} className="me-2" size="lg" />
            <TextField
              sx={{ width: 300, backgroundColor: "white", borderRadius: "5px" }}
              id="date"
              label={dateSelected.startDate != null ? "" : "Check-in - Check-out"}
              type="text"
              value={
                dateSelected.startDate
                  ? `${dateSelected.startDate.toLocaleDateString("es-ES")} - ${dateSelected.endDate.toLocaleDateString("es-ES")}`
                  : ""
              }
              onClick={() => setShowDatePicker(true)}
              InputLabelProps={{
                shrink: false,
                disabled: true,
              }}
              size="small"
            />
          </div>
          <DatePicker
            open={showDatePicker}
            onClose={(date) => handleSelectedDate(date)}
            onCancel={() => setShowDatePicker(false)}
          />
          <button
            className="btn btn-primary search-button text-white"
            onClick={goToSearch}
          >
            <FontAwesomeIcon icon={faSearch} /> Buscar
          </button>
        </div>
      </div>

      <div className="categories">
        <h2 className="text-center title mt-5">Categorías</h2>
        <div className="row justify-content-center">
          {categories.map((category) =>
            !loading ? (
              <div className="col-12 col-md-6 mb-2" key={category.id}>
                <CategoryEntry
                  category={category}
                  onSelectCategory={handleSelectCategory}
                />
              </div>
            ) : (
              <div className="col-12 col-md-6 mb-4" key={category.id}>
                <HomeLoader />
              </div>
            )
          )}
        </div>
      </div>

      <div className="recommendations">
        <h2 className="text-center title mt-5">Recomendaciones</h2>
        <div className="row justify-content-center">
          {limitedProducts.map((product) =>
            !loading ? (
              <div className="col-12 col-md-6 mb-2" key={product.id}>
                <ProductEntry
                  product={product}
                  onSelectItem={(product) => onSelectItem(product)}
                />
              </div>
            ) : (
              <div className="col-12 col-md-6 mb-4" key={product.id}>
                <HomeLoader />
              </div>
            )
          )}
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
