import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogText from "./DialogText";
import axios from "axios";
import { Autocomplete } from "@mui/material";
import ProductFeature from "./ProductFeature";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { subscribe, unsubscribe } from "../events";

export default function EditProduct({ open, onConfirm, onCancel, product }) {
  const [images, setImages] = React.useState([]);
  const [features, setFeatures] = React.useState([]);
  const [dialogText, setDialogText] = React.useState("");
  const [categories, setCategories] = React.useState([]);
  let categoriesRef = React.useRef(categories);
  const [categoryName, setCategoryName] = React.useState("");

  // fetch categories
  React.useEffect(() => {
    axios
      .get("/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        setDialogText("Error al cargar las categorías.");
        console.error(error);
      });

    subscribe("updateCategory", updateOrCreateCategory);
    subscribe("createCategory", updateOrCreateCategory);
    subscribe("deleteCategory", deleteCategory);

    return () => {
      unsubscribe("updateCategory");
      unsubscribe("createCategory");
      unsubscribe("deleteCategory");
    };
  }, []);

  React.useEffect(() => {
    categoriesRef.current = categories;
  }, [categories]);

  const deleteCategory = async ({ detail }) => {
    const categoryId = detail;

    // find category and remove from list
    const newCategories = [...categoriesRef.current];
    const index = newCategories.findIndex((it) => it.id == categoryId);
    if (index === -1) return;

    newCategories.splice(index, 1);
    setCategories(newCategories);
  };

  const updateOrCreateCategory = async ({ detail }) => {
    const categoryId = detail;
    axios
      .get(`/categories/get/${categoryId}`)
      .then((response) => {
        if (response.status != 200) return;

        const category = response.data;
        if (!category) return;

        const newCategories = [...categoriesRef.current];
        const index = newCategories.findIndex((it) => it.id == categoryId);

        if (index === -1) {
          newCategories.push(category);
          setCategories([...newCategories]);
        } else {
          newCategories[index] = category;
          setCategories([...newCategories]);
        }
      })
      .catch((e) => {
        console.error(e);
        setDialogText("Error al actualizar la categoría.");
      });
  };

  const addImage = () => {
    if (product && product.images) {
      product.images.push("");
      setImages([...product.images]);
    } else {
      setImages([...images, ""]);
    }
  };

  const addFeature = () => {
    if (product && product.features) {
      product.features.push([
        "sell f05b",
        "Caracteristica " + (product.features.length + 1),
      ]);
      setFeatures([...product.features]);
    } else {
      setFeatures([
        ...features,
        ["sell f05b", "Caracteristica " + (features.length + 1)],
      ]);
    }
  };

  const removeFeature = (index) => {
    if (product && product.features) {
      product.features.splice(index, 1);
      setFeatures([...product.features]);
    } else {
      features.splice(index, 1);
      setFeatures([...features]);
    }
  };

  const changeFeature = (index, subIndex, value) => {
    if (product && product.features) {
      product.features[index][subIndex] = value;
      setFeatures([...product.features]);
    } else {
      features[index][subIndex] = value;
      setFeatures([...features]);
    }
  };

  const onCloseDialogText = () => {
    setDialogText("");
  };

  const handleClose = () => {
    setImages([]);
    setFeatures([]);
    setDialogText("");
    setCategoryName("");
    onCancel();
  };

  return (
    <>
      <DialogText text={dialogText} onClose={onCloseDialogText} onConfirm={onCloseDialogText} />
      <Dialog
        open={open}
        onClose={() => handleClose()}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const newProduct = Object.fromEntries(formData.entries());
            newProduct.id = product?.id || "";
            newProduct.images = [];
            for (let key of Object.keys(newProduct)) {
              if (key.startsWith("image-")) {
                const value = newProduct[key];
                if (value.startsWith("http")) newProduct.images.push(value);
                delete newProduct[key];
              }
            }

            if (newProduct.images.length === 0) {
              setDialogText("Debe agregar al menos una imagen.");
              return;
            }

            if (newProduct.name.length === 0) {
              setDialogText("Debe agregar un nombre al producto.");
              return;
            }

            if (newProduct.description.length === 0) {
              setDialogText("Debe agregar una descripción al producto.");
              return;
            }

            // set address
            newProduct.address = {
              country: newProduct.country,
              city: newProduct.city,
            };
            delete newProduct.country;
            delete newProduct.city;

            // set features
            newProduct.features = [];
            for (let feature of features) {
              newProduct.features.push(feature);
            }

            setFeatures([]);

            // get category by name and set id
            const category = categories.find(
              (it) => it.name == newProduct.categoryName
            );
            newProduct.categoryId = category?.id || "";
            delete newProduct.categoryName;

            onConfirm(newProduct);
          },
        }}
      >
        <DialogTitle>Manager de Producto</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Aquí puedes seleccionar el nombre, descripción e imágenes del
            producto.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Nombre del producto"
            type="text"
            fullWidth
            variant="outlined"
            inputProps={{ defaultValue: product?.name || "" }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="description"
            name="description"
            label="Descripción del producto"
            type="text"
            fullWidth
            multiline
            maxRows={4}
            variant="outlined"
            inputProps={{ defaultValue: product?.description || "" }}
          />
          <Autocomplete
            id="categoryName"
            disablePortal
            options={categories.map((category) => category.name)}
            value={
              categories.find(
                (category) => category.products.indexOf(product?.id) != -1
              )?.name || ""
            }
            onChange={(event, value) => setCategoryName(value || "")}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Categoría del producto"
                id="categoryName"
                type="text"
              />
            )}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="country"
            name="country"
            label="País"
            type="text"
            fullWidth
            multiline
            maxRows={4}
            variant="outlined"
            inputProps={{ defaultValue: product?.address?.country || "" }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="city"
            name="city"
            label="Ciudad"
            type="text"
            fullWidth
            multiline
            maxRows={4}
            variant="outlined"
            inputProps={{ defaultValue: product?.address?.city || "" }}
          />
          <input type="hidden" name="categoryName" value={categoryName} />
          {product?.features
            ? product.features.map((feature, featureIndex) => (
                <div key={featureIndex} className="p-3 mt-2 mb-2 border">
                  <span>Característica #{featureIndex + 1}</span>
                  <hr></hr>
                  <ProductFeature
                    icon={feature[0]}
                    name={feature[1]}
                    onChangeIcon={(value) =>
                      changeFeature(featureIndex, 0, value)
                    }
                    onChangeName={(value) =>
                      changeFeature(featureIndex, 1, value)
                    }
                  />
                  <Button className="mt-2" color="error" variant="outlined">
                    <FontAwesomeIcon icon={faCircleXmark} color="red" />{" "}
                    <span
                      className="ms-2"
                      onClick={() => removeFeature(featureIndex)}
                    >
                      Borrar
                    </span>
                  </Button>
                </div>
              ))
            : features.map((feature, featureIndex) => (
                <div key={featureIndex} className="p-3 mt-2 mb-2 border">
                  <span>Característica #{featureIndex + 1}</span>
                  <hr></hr>
                  <ProductFeature
                    icon={feature[0]}
                    name={feature[1]}
                    onChangeIcon={(value) =>
                      changeFeature(featureIndex, 0, value)
                    }
                    onChangeName={(value) =>
                      changeFeature(featureIndex, 1, value)
                    }
                  />
                  <Button className="mt-2" color="error" variant="outlined">
                    <FontAwesomeIcon icon={faCircleXmark} color="red" />{" "}
                    <span
                      className="ms-2"
                      onClick={() => removeFeature(featureIndex)}
                    >
                      Borrar
                    </span>
                  </Button>
                </div>
              ))}
          {product?.images
            ? product.images.map((image, index) => (
                <TextField
                  key={index}
                  autoFocus
                  margin="dense"
                  id={`image-${index}`}
                  name={`image-${index}`}
                  label={`Imagen ${index + 1}`}
                  type="text"
                  fullWidth
                  variant="outlined"
                  helperText="URL de la imagen, dejar en blanco para eliminar."
                  inputProps={{ defaultValue: image }}
                />
              ))
            : images.map((image, index) => (
                <TextField
                  key={index}
                  autoFocus
                  margin="dense"
                  id={`image-${index}`}
                  name={`image-${index}`}
                  label={`Imagen ${index + 1}`}
                  type="text"
                  fullWidth
                  variant="outlined"
                  helperText="URL de la imagen, dejar en blanco para eliminar."
                  inputProps={{ defaultValue: image }}
                />
              ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={addFeature} variant="contained" color="info">
            <FontAwesomeIcon icon={faCirclePlus} />{" "}
            <span style={{ marginLeft: "5px" }}>característica</span>
          </Button>
          <Button onClick={addImage} variant="contained" color="info">
            <FontAwesomeIcon icon={faCirclePlus} />{" "}
            <span style={{ marginLeft: "5px" }}>imagen</span>
          </Button>
          <Button
            onClick={() => handleClose()}
            variant="outlined"
            color="error"
          >
            Cancelar
          </Button>
          <Button type="submit" variant="contained" color="success">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
