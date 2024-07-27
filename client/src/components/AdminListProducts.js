import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteProduct from "./DeleteProduct";
import EditProduct from "./EditProduct";
import DialogText from "./DialogText";

const AdminListProducts = () => {
  const [products, setProducts] = useState([]);
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
  }, []);

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
          fetchProducts();
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

  const confirmEdit = async (product) => {
    try {
      setEditProduct(null);
      const edited = await axios.post(`/products/edit/${product.id}`, product);
      switch (edited.status) {
        case 200: {
          setDialogText("Producto editado correctamente");
          fetchProducts();
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
    <div className="container-fluid justify-content-center align-items-center">
      <DeleteProduct
        product={deleteProduct}
        confirmDelete={confirmDelete}
        cancelDelete={cancelDelete}
      />
      <EditProduct
        open={editProduct != null}
        product={editProduct}
        onConfirm={confirmEdit}
        onCancel={cancelEdit}
      />
      <DialogText text={dialogText} onClose={onCloseDialogText} />
      <div className="d-flex flex-column w-100">
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
                  <p className="card-text">ID: <b>{product.id}</b></p>
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
