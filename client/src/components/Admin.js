import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import AdminListProducts from "./AdminListProducts";
import EditProduct from "./EditProduct";
import DialogText from "./DialogText";
import EditCategory from "./EditCategory";

const Admin = () => {
  const [validToken, setValidToken] = useState(null);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showProducts, setShowProducts] = useState(false);
  const [createProduct, setCreateProduct] = useState(false);
  const [dialogText, setDialogText] = useState("");
  const [createCategory, setCreateCategory] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      getValidToken();
    }
  }, [token]);

  const getValidToken = async () => {
    try {
      const response = await axios.get("/users/validate");
      setValidToken(response.data);
    } catch (e) {
      console.error(e);
      setValidToken(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/users/login", {
        username: usernameInput,
        password: passwordInput,
      });
      if (response.status === 200) {
        localStorage.setItem("token", response.data);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data}`;
        setValidToken(true);
        setLoginError("");
      }
    } catch (error) {
      setLoginError("Contraseña o usuario incorrecto");
      console.error(error);
    }
  };

  const handleListProducts = () => {
    if (showProducts) {
      setShowProducts(false);
      return;
    }
    setShowProducts(true);
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
      const updateListProduct = showProducts;
      if (updateListProduct) setShowProducts(false);
      const response = await axios.post("/products/add", product);
      switch (response.status) {
        case 201: {
          setCreateProduct(false);
          setDialogText("Producto creado correctamente");
          if (updateListProduct) {
            setShowProducts(true);
          }
          break;
        }
        case 409: {
          setDialogText(
            "El producto con ese nombre ya existe. Intenta con otro."
          );
          break;
        }
        case 401: {
          setDialogText("No tienes permisos para crear productos");
          setCreateProduct(false);
          break;
        }
        default: {
          setDialogText("Error al crear el producto");
          setCreateProduct(false);
          break;
        }
      }
    } catch (error) {
      console.error(error);
      setDialogText("Error al crear el producto");
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
      {validToken ? (
        <div className="d-none d-lg-flex flex-column align-items-center justify-content-center border rounded shadow-sm p-4 mt-5">
          <DialogText text={dialogText} onClose={onCloseDialogText} />
          <h1>Menú de acciones</h1>
          <div className="d-flex flex-column">
            <div className="row">
              <div className="col-12 col-lg-6">
                <button
                  className="btn btn-primary m-4"
                  onClick={handleListProducts}
                >
                  {showProducts ? "Ocultar productos" : "Listar productos"}
                </button>
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
            <div className="row">
              <div className="col-12 col-lg-6">
                <button className="btn btn-primary m-4" onClick={enableCreateCategory}>Agregar categoría</button>
              </div>
              <div className="col d-flex justify-content-center align-items-center">
                <span>Crea una nueva categoría que podrá ser asignada a un producto.</span>
              </div>
            </div>
          </div>

          {showProducts && <AdminListProducts />}
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
      ) : (
        <div className="d-none d-lg-block d-flex align-items-center justify-content-center">
          <div
            className="p-4 border rounded shadow-sm"
            style={{ width: "100%", maxWidth: "400px" }}
          >
            <h1 className="text-center mb-4">Panel Administrativo</h1>
            {loginError && (
              <p className="text-danger text-center">{loginError}</p>
            )}
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Nombre de usuario
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Iniciar sesión
              </button>
            </form>
          </div>
        </div>
      )}
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
