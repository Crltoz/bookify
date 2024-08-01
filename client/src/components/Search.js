import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductInfo from "./ProductInfo";
import ProductEntry from "./ProductEntry";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import "./css/Search.css";

const Search = ({ categories }) => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [checked, setChecked] = React.useState([0]);

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
      const response = await axios.get("/products/search");
      setProducts(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container-fluid search min-vh-100">
      <ProductInfo
        product={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
      <div className="row d-flex justify-content-center">
        <div className="col-sm-3 mb-5">
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
                      <ListItemText id={labelId} primary={category.name} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </div>
        </div>
        <div className="col col-lg-6">
          {products.map((product) => {
            const filters = (
              (product.name.toLowerCase().includes(search.toLowerCase()) ||
              product.description.toLowerCase().includes(search.toLowerCase()))
                 &&
              (checked.length == 0 ||
                checked.find((index) => categories[index].id == product.categoryId) != null)
              );
            return filters && (
              <ProductEntry
                product={product}
                onSelectItem={(product) => setSelectedItem(product)}
                key={product.id}
              />
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default Search;
