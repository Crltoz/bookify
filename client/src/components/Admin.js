import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import AdminListProducts from "./AdminListProducts";
import EditProduct from "./EditProduct";
import DialogText from "./DialogText";
import EditCategory from "./EditCategory";
import AdminListUsers from "./AdminListUsers";
import AdminListCategories from "./AdminListCategories";
import { subscribe, unsubscribe } from "../events";

const Admin = ({ user }) => {
  const [showProducts, setShowProducts] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [createProduct, setCreateProduct] = useState(false);
  const [dialogText, setDialogText] = useState("");
  const [createCategory, setCreateCategory] = useState(false);

  useEffect(() => {
    if (!user || !user.isAdmin) {
      window.location.href = "/";
    }
  }, [user]);

  const handleListProducts = () => {
    setShowProducts(!showProducts);

    if (!showProducts) {
      setShowUsers(false);
      setShowCategories(false);
    }
  };

  const handleListUsers = () => {
    setShowUsers(!showUsers);

    if (!showUsers) {
      setShowProducts(false);
      setShowCategories(false);
    }
  };

  const handleListCategories = () => {
    setShowCategories(!showCategories);

    if (!showCategories) {
      setShowProducts(false);
      setShowUsers(false);
    }
  };

  const onCloseDialogText = () => {
    setDialogText("");
  };

  const enableCreateProduct = () => {
    setCreateProduct(true);
  };

  const enableCreateCategory = () => {
    setCreateCategory(true);
  };

  const confirmCreateProduct = async (product) => {
    try {
      const response = await axios.post("/products/add", product);
      switch (response.status) {
        case 201: {
          setCreateProduct(false);
          setDialogText("Producto creado correctamente");
          break;
        }
        case 409: {
          setDialogText(
            "El producto con ese nombre ya existe. Intenta con otro."
          );
          break;
        }
        case 401: {
          setDialogText("No tienes permisos para crear productos.");
          setCreateProduct(false);
          // move to main
          window.location.href = "/";
          break;
        }
        default: {
          setDialogText("Error al crear el producto.");
          setCreateProduct(false);
          break;
        }
      }
    } catch (error) {
      console.error(error);
      setDialogText("Error al crear el producto.");
      setCreateProduct(false);
    }
  };

  const confirmCreateCategory = async (category) => {
    try {
      const response = await axios.post("/categories/add", category);
      switch (response.status) {
        case 201: {
          setCreateCategory(false);
          setDialogText("Categoría creada correctamente");
          break;
        }
        case 409: {
          setDialogText(
            "Ya existe una categoría con ese nombre. Intenta con otro."
          );
          break;
        }
        case 401: {
          setDialogText("No tienes permisos para crear categorías");
          setCreateCategory(false);
          break;
        }
        default: {
          setDialogText("Error al crear la categoría");
          setCreateCategory(false);
          break;
        }
      }
    } catch (error) {
      console.error(error);
      setDialogText("Error al crear la categoría");
      setCreateCategory(false);
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100">
      <div className="d-none d-lg-flex flex-column align-items-center justify-content-center border rounded shadow-sm p-4 mt-5">
        <DialogText text={dialogText} onClose={onCloseDialogText} />
        <h1>Menú de acciones</h1>
        <div className="d-flex flex-column">
          <div className="row">
            <div className="col-12 col-lg-6">
              {showProducts ? (
                <button
                  className="btn btn-outline-primary m-4"
                  onClick={handleListProducts}
                >
                  Ocultar productos
                </button>
              ) : (
                <button
                  className="btn btn-primary m-4"
                  onClick={handleListProducts}
                >
                  Listar productos
                </button>
              )}
            </div>
            <div className="col d-flex justify-content-center align-items-center">
              <span>
                Muestra todos los productos publicados y opciones para
                modificarlos.
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-lg-6">
              <button
                className="btn btn-primary m-4"
                onClick={enableCreateProduct}
              >
                Agregar producto
              </button>
            </div>
            <div className="col d-flex justify-content-center align-items-center">
              <span>Crea un nuevo producto y publicalo en la web.</span>
            </div>
          </div>
          <hr></hr>
          <div className="row">
            <div className="col-12 col-lg-6">
              <button
                className="btn btn-primary m-4"
                onClick={enableCreateCategory}
              >
                Agregar categoría
              </button>
            </div>
            <div className="col d-flex justify-content-center align-items-center">
              <span>
                Crea una nueva categoría que podrá ser asignada a un producto.
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-lg-6">
              {showCategories ? (
                <button
                  className="btn btn-outline-primary m-4"
                  onClick={handleListCategories}
                >
                  Ocultar categorías
                </button>
              ) : (
                <button
                  className="btn btn-primary m-4"
                  onClick={handleListCategories}
                >
                  Listar categorías
                </button>
              )}
            </div>
            <div className="col d-flex justify-content-center align-items-center">
              <span>
                Muestra todas las categorías disponibles y opciones para editar.
              </span>
            </div>
          </div>
          <hr></hr>
          <div className="row">
            <div className="col-12 col-lg-6">
              {showUsers ? (
                <button
                  className="btn btn-outline-primary m-4"
                  onClick={handleListUsers}
                >
                  Ocultar usuarios
                </button>
              ) : (
                <button
                  className="btn btn-primary m-4"
                  onClick={handleListUsers}
                >
                  Listar usuarios
                </button>
              )}
            </div>
            <div className="col d-flex justify-content-center align-items-center">
              <span>
                Muestra todos los usuarios registrados y opciones para
                modificarlos.
              </span>
            </div>
          </div>
        </div>

        {showProducts && <AdminListProducts />}
        {showUsers && <AdminListUsers selfUser={user} />}
        {showCategories && <AdminListCategories />}
        <EditProduct
          open={createProduct}
          product={{}}
          onConfirm={confirmCreateProduct}
          onCancel={() => setCreateProduct(false)}
        />
        <EditCategory
          open={createCategory}
          category={{}}
          onConfirm={confirmCreateCategory}
          onCancel={() => setCreateCategory(false)}
        />
      </div>

      <div className="d-lg-none d-flex align-items-center justify-content-center mt-5 min-vh-100">
        <h2>
          <FontAwesomeIcon icon={faCircleExclamation} className="me-2" /> El
          panel de administración sólo está disponible desde ordenador.
        </h2>
      </div>
    </div>
  );
};

export default Admin;
