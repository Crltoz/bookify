import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ProductEntry from "./ProductEntry";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import "./css/Search.css";
import { subscribe, unsubscribe } from "../events";
import HomeLoader from "./HomeLoader";

const query = new URLSearchParams(window.location.search).get("query");

const Search = ({ categories }) => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const productRef = useRef(products);
  const [checked, setChecked] = React.useState([]);

  useEffect(() => {
    getProducts();

    subscribe("updateProduct", updateProductEvent);
    subscribe("deleteProduct", deleteProductEvent);
    subscribe("createProduct", updateProductEvent);

    return () => {
      unsubscribe("updateProduct");
      unsubscribe("deleteProduct");
      unsubscribe("createProduct");
    };
  }, []);

  useEffect(() => {
    productRef.current = products;
  }, [products]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const getProducts = async () => {
    try {
      const response = await axios.get("/products/search?query=" + query);
      setProducts(response.data);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (e) {
      console.error(e);
    }
  };

  const deleteProductEvent = ({ detail }) => {
    const productId = detail;
    const newProducts = productRef.current.filter((it) => it.id != productId);
    setProducts(newProducts);
  };

  const updateProductEvent = async ({ detail }) => {
    try {
      const productId = detail;
      const response = await axios.get(`/products/get/${productId}`);
      const product = response.data;
      if (!product) return;

      const newProducts = [...productRef.current];
      const index = newProducts.findIndex((it) => it.id == productId);
      if (index == -1) {
        newProducts.push(product);
        setProducts(newProducts);
        return;
      }

      newProducts[index] = product;
      setProducts(newProducts);
    } catch (e) {
      console.error(e);
    }
  };

  const onSelectItem = (product) => {
    window.location.href = `/product?id=${product.id}`;
  };

  return (
    <div className="container-fluid search min-vh-100">
      <div className="row d-flex justify-content-center">
        <div className="col-sm-3">
          <div className="sticky-top" style={{ paddingTop: '70px' }}>
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="list-group">
              <List
                sx={{
                  width: "100%",
                  bgcolor: "background.paper",
                }}
              >
                {categories.map((category, index) => {
                  const labelId = `checkbox-list-label-${index}`;

                  return (
                    <ListItem key={index} disablePadding>
                      <ListItemButton
                        role={undefined}
                        onClick={handleToggle(index)}
                        dense
                      >
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={checked.indexOf(index) !== -1}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          id={labelId}
                          primary={`${category.name} (${
                            products.filter((it) =>
                              category.products.includes(it.id)
                            ).length
                          })`}
                        />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </div>
          </div>
        </div>
        <div className="col col-lg-6">
          {products.map((product) => {
            const lcSearch = search.toLowerCase();
            const filters =
              (product.name.toLowerCase().includes(lcSearch) ||
                product.description.toLowerCase().includes(lcSearch) ||
                product.address.country.toLowerCase().includes(lcSearch) ||
                product.address.city.toLowerCase().includes(lcSearch)) &&
              (checked.length == 0 ||
                checked.find(
                  (index) =>
                    categories[index]?.products?.indexOf(product.id) != -1
                ) != null);
            return filters && !loading ? (
              <ProductEntry
                product={product}
                onSelectItem={(product) => onSelectItem(product)}
                key={product.id}
              />
            ) : (
              loading && <HomeLoader key={product.id} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Search;
