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
import {
  faArrowRight,
  faCirclePlus,
  faCircleXmark,
  faList,
  faListCheck,
  faLock,
  faMapMarker,
  faPhotoVideo,
} from "@fortawesome/free-solid-svg-icons";
import { subscribe, unsubscribe } from "../events";
import _ from 'lodash';

export default function EditProduct({ open, onConfirm, onCancel, product }) {
  const [dialogText, setDialogText] = React.useState("");
  const [categories, setCategories] = React.useState([]);
  let categoriesRef = React.useRef(categories);
  const [categoryName, setCategoryName] = React.useState("");
  const [editableProduct, setEditableProduct] = React.useState(null);
  const editableProductRef = React.useRef(editableProduct);

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

    subscribe("updateCategory", updateOrCreateCategoryEvent);
    subscribe("createCategory", updateOrCreateCategoryEvent);
    subscribe("deleteCategory", deleteCategory);

    if (product && product.name) {
      setEditableProduct(_.cloneDeep(product));
    } else {
      // set default product
      setEditableProduct({
        name: "",
        description: "",
        address: { country: "", city: "" },
        features: [],
        policies: [],
        images: [],
      });
    }

    return () => {
      unsubscribe("updateCategory");
      unsubscribe("createCategory");
      unsubscribe("deleteCategory");
    };
  }, []);

  React.useEffect(() => {
    editableProductRef.current = editableProduct;
  }, [editableProduct]);

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

  const updateOrCreateCategoryEvent = async ({ detail }) => {
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
    editableProductRef.current.images.push("");
    setEditableProduct({ ...editableProductRef.current });
  };

  const addFeature = () => {
    editableProductRef.current.features.push([
      "sell f05b",
      "Caracteristica " + (editableProduct.features.length + 1),
    ]);
    setEditableProduct({ ...editableProductRef.current });
  };

  const removeFeature = (index) => {
    editableProductRef.current.features.splice(index, 1);
    setEditableProduct({ ...editableProductRef.current });
  };

  const changeFeature = (index, subIndex, value) => {
    if (!editableProductRef.current) return;
    editableProductRef.current.features[index][subIndex] = value;
    setEditableProduct({ ...editableProductRef.current });
  };

  const onCloseDialogText = () => {
    setDialogText("");
  };

  const handleClose = () => {
    setDialogText("");
    onCancel();
  };

  const removePolicy = (index) => {
    editableProductRef.current.policies.splice(index, 1);
    setEditableProduct({ ...editableProductRef.current });
  };

  const addPolicy = () => {
    editableProductRef.current.policies.push({ title: "", description: "" });
    setEditableProduct({ ...editableProductRef.current });
  };

  const removeLastImage = () => {
    editableProductRef.current.images.pop();
    setEditableProduct({ ...editableProductRef.current });
  };

  return editableProductRef.current && (
    <>
      <DialogText
        text={dialogText}
        onClose={onCloseDialogText}
        onConfirm={onCloseDialogText}
      />
      <Dialog
        open={open}
        onClose={() => handleClose()}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();

            // add category id to product
            const category = categories.find(
              (category) => category.name === categoryName
            );
            if (category) {
              editableProductRef.current.categoryId = category.id;
            } else {
              editableProductRef.current.categoryId = "";
            }

            const product = Object.assign({}, editableProductRef.current);
            onConfirm(product);
          },
        }}
      >
        <DialogTitle>Manager de Producto</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Aquí podrás editar todos los campos del producto seleccionado.
          </DialogContentText>

          <hr></hr>
          <h5>
            <FontAwesomeIcon icon={faArrowRight} /> Nombre y descripción
          </h5>
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
            onChange={(event) => { editableProductRef.current.name = event.target.value; setEditableProduct({...editableProductRef.current}) }}
          />
          <TextField
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
            onChange={(event) => { editableProductRef.current.description = event.target.value; setEditableProduct({...editableProductRef.current}) }}
          />
          <hr></hr>

          <h5 className="mb-4">
            <FontAwesomeIcon icon={faList} /> Categoría
          </h5>
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
          <input type="hidden" name="categoryName" value={categoryName} />
          <hr></hr>

          <h5>
            <FontAwesomeIcon icon={faMapMarker} /> Localización
          </h5>
          <TextField
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
            onChange={(event) => { editableProductRef.current.address.country = event.target.value; setEditableProduct({...editableProductRef.current}) }}
          />
          <TextField
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
            onChange={(event) => { editableProductRef.current.address.city = event.target.value; setEditableProduct({...editableProductRef.current}) }}
          />
          <hr></hr>

          <h5>
            <FontAwesomeIcon icon={faListCheck} /> Características{" "}
            <Button onClick={addFeature} variant="contained" color="info">
              <FontAwesomeIcon icon={faCirclePlus} />{" "}
              <span style={{ marginLeft: "5px" }}>característica</span>
            </Button>
          </h5>

          {editableProduct?.features?.map((feature, featureIndex) => (
            <div key={featureIndex} className="p-3 mt-2 mb-2 border">
              <span>Característica #{featureIndex + 1}</span>
              <hr></hr>
              <ProductFeature
                icon={feature[0]}
                name={feature[1]}
                onChangeIcon={(value) => changeFeature(featureIndex, 0, value)}
                onChangeName={(value) => changeFeature(featureIndex, 1, value)}
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
          <hr></hr>

          <h5>
            <FontAwesomeIcon icon={faLock} /> Políticas
            <Button
              className="ms-3"
              onClick={addPolicy}
              variant="contained"
              color="info"
            >
              <FontAwesomeIcon icon={faCirclePlus} />{" "}
              <span style={{ marginLeft: "5px" }}>política</span>
            </Button>
          </h5>
          {editableProduct?.policies?.map((policy, policyIndex) => (
            <div key={policyIndex} className="p-3 mt-2 mb-2 border">
              <span>Política #{policyIndex + 1}</span>
              <hr></hr>
              <TextField
                key={policyIndex}
                margin="dense"
                id={`policy-${policyIndex}`}
                name={`policy-${policyIndex}`}
                label={`Título`}
                type="text"
                variant="outlined"
                inputProps={{ defaultValue: policy.title }}
                onChange={(event) => { editableProductRef.current.policies[policyIndex].title = event.target.value; setEditableProduct({...editableProductRef.current}) }}
              />
              <TextField
                key={policyIndex + 100}
                margin="dense"
                id={`policy-${policyIndex + 100}`}
                name={`policy-${policyIndex + 100}`}
                label={`Descripción ${policyIndex + 1}`}
                type="text"
                variant="outlined"
                inputProps={{ defaultValue: policy.description }}
                onChange={(event) => { editableProductRef.current.policies[policyIndex].description = event.target.value; setEditableProduct({...editableProductRef.current}) }}
                fullWidth
                multiline
                maxRows={4}
              />
              <Button className="mt-2" color="error" variant="outlined">
                <FontAwesomeIcon icon={faCircleXmark} color="red" />{" "}
                <span
                  className="ms-2"
                  onClick={() => removePolicy(policyIndex)}
                >
                  Borrar
                </span>
              </Button>
            </div>
          ))}

          <hr></hr>
          <h5>
            <FontAwesomeIcon icon={faPhotoVideo} /> Imágenes{" "}
            <Button
              className="ms-3"
              onClick={addImage}
              variant="contained"
              color="info"
            >
              <FontAwesomeIcon icon={faCirclePlus} />{" "}
              <span style={{ marginLeft: "5px" }}>imagen</span>
            </Button>
            <Button className="ms-2" color="error" variant="contained">
              <FontAwesomeIcon icon={faCircleXmark} />{" "}
              <span className="ms-2" onClick={removeLastImage}>
                Borrar última
              </span>
            </Button>
          </h5>
          {editableProduct?.images?.map((image, index) => (
            <TextField
              key={index}
              margin="dense"
              id={`image-${index}`}
              name={`image-${index}`}
              label={`Imagen ${index + 1}`}
              type="text"
              fullWidth
              variant="outlined"
              helperText="URL de la imagen."
              inputProps={{ defaultValue: image }}
            />
          ))}
        </DialogContent>
        <DialogActions>
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
