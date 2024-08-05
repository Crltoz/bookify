import React, { useEffect, useState } from "react";
import axios from "axios";
import EditProduct from "./EditProduct";
import DialogText from "./DialogText";
import { useRef } from "react";
import { subscribe, unsubscribe } from "../events";
import DeleteConfirmation from "./DeleteProduct";

const AdminListProducts = () => {
  const [products, setProducts] = useState([]);
  const productRef = useRef(products);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [dialogText, setDialogText] = useState("");

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();

    subscribe("updateProduct", updateProductEvent);
    subscribe("deleteProduct", deleteProductEvent);

    return () => {
      unsubscribe("updateProduct");
    };
  }, []);

  useEffect(() => {
    productRef.current = products;
  }, [products]);

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

  const handleEdit = (product) => {
    setEditProduct(product);
  };

  const handleDelete = (product) => {
    setDeleteProduct(product);
  };

  const confirmDelete = async (product) => {
    try {
      setDeleteProduct(null);
      const deleted = await axios.delete(`/products/delete/${product.id}`);
      switch (deleted.status) {
        case 200: {
          setDialogText("Producto eliminado correctamente");
          break;
        }
        case 401: {
          setDialogText("No tienes permisos para eliminar el producto");
          break;
        }
        case 404: {
          setDialogText("Producto no encontrado");
          break;
        }
        default: {
          setDialogText("Error al eliminar el producto");
          break;
        }
      }
    } catch (error) {
      console.error(error);
      setDialogText("Error al eliminar el producto");
    }
  };

  const cancelDelete = () => {
    setDeleteProduct(null);
  };

  const cancelEdit = () => {
    setEditProduct(null);
  };

  const confirmEdit = async (editedProduct) => {
    try {
      setEditProduct(null);
      const edited = await axios.post(`/products/edit`, editedProduct);
      switch (edited.status) {
        case 200: {
          setDialogText("Producto editado correctamente");
          break;
        }
        case 400: {
          setDialogText("Datos del producto incorrectos");
          break;
        }
        case 401: {
          setDialogText("No tienes permisos para editar el producto");
          break;
        }
        case 404: {
          setDialogText("Producto no encontrado");
          break;
        }
        default: {
          setDialogText("Error al editar el producto");
          break;
        }
      }
    } catch (error) {
      console.error(error);
      setDialogText("Error al editar el producto");
    }
  };

  const onCloseDialogText = () => {
    setDialogText("");
  };

  return (
    <div className="container justify-content-center align-items-center">
      <DeleteConfirmation
        productOrCategory={deleteProduct}
        title="Eliminar producto"
        description="¿Estás seguro de que quieres eliminar el producto {name}? Esta acción es irreversible."
        confirmDelete={confirmDelete}
        cancelDelete={cancelDelete}
      />
      {editProduct && (
        <EditProduct
          open={editProduct != null}
          product={editProduct}
          onConfirm={confirmEdit}
          onCancel={cancelEdit}
        />
      )}
      <DialogText
        text={dialogText}
        onClose={onCloseDialogText}
        onConfirm={onCloseDialogText}
      />
      <hr></hr>
      <div className="d-flex flex-column w-100 mt-5">
        <h1>Productos</h1>
        <hr></hr>
        <div className="row w-100">
          {products.map((product, index) => (
            <div key={index} className="col-12 mb-3">
              <div className="card d-flex flex-row">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="card-img-left"
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
                <div className="card-body">
                  <p className="card-text">
                    ID: <b>{product.id}</b>
                  </p>
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>

                  <div className="d-flex align-items-center justify-content-center">
                    <button
                      className="btn btn-warning m-2"
                      onClick={() => handleEdit(product)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger m-2"
                      onClick={() => handleDelete(product)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminListProducts;
