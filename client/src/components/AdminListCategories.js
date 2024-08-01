import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { subscribe, unsubscribe } from "../events";
import DialogText from "./DialogText";
import EditCategory from "./EditCategory";

const AdminListCategories = () => {
  const [categories, setCategories] = useState([]);
  let categoriesRef = useRef(categories);
  const [dialogText, setDialogText] = useState("");
  const [editCategory, setEditCategory] = useState(null);

  useEffect(() => {
    axios.get("/categories").then((response) => {
      setCategories(response.data);
    });

    subscribe("updateCategory", updateOrCreateCategory);
    subscribe("createCategory", updateOrCreateCategory);
    subscribe("deleteCategory", deleteCategory);

    return () => {
      unsubscribe("updateCategory");
    };
  }, []);

  useEffect(() => {
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

  const handleDeleteCategory = async (category) => {
    const deleted = await axios.delete(`/categories/delete/${category.id}`);
    switch (deleted.status) {
      case 200:
        setDialogText("Categoría eliminada correctamente.");
        break;
      case 404:
        setDialogText("Categoría no encontrada.");
        break;
      case 401:
        setDialogText("No tienes permisos para eliminar categorías.");
        break;
      default:
        setDialogText("Error al eliminar la categoría.");
        break;
    }
  };

  const handleEditCategory = async (newCategory) => {
    const update = await axios.post(
      `/categories/update`,
      newCategory
    );
    switch (update.status) {
      case 200:
        setDialogText("Categoría actualizada correctamente.");
        break;
      case 400:
        setDialogText("Error al actualizar la categoría. Datos inválidos.");
        break;
      case 404:
        setDialogText(
          "Error al actualizar la categoría. Al aparecer ya no existe."
        );
        break;
      case 401:
        setDialogText("Error al actualizar la categoría. No autorizado.");
        break;
      default:
        setDialogText("Error desconocido al actualizar la categoría.");
        break;
    }

    setEditCategory(null);
  };

  return (
    <div className="container-fluid">
      <EditCategory
        open={editCategory != null}
        category={editCategory}
        onCancel={() => setEditCategory(null)}
        onConfirm={(newCategory) => handleEditCategory(newCategory)}
      />
      <DialogText text={dialogText} onClose={() => setDialogText("")} />
      <div className="d-flex flex-column w-100">
        <div className="row w-100">
          {categories.map((category, index) => (
            <div key={index} className="col-12 mb-3">
              <div className="card d-flex flex-row">
                <img
                  src={category.image}
                  alt={category.name}
                  className="card-img-left"
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
                <div className="card-body">
                  <p className="card-text">
                    Category ID: <b>{category.id}</b>
                  </p>
                  <h5 className="card-title">{category.name}</h5>
                  <p className="card-text">{category.description}</p>

                  <div className="d-flex align-items-center justify-content-center">
                    <button
                      className="btn btn-warning m-2"
                      onClick={() => setEditCategory(category)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger m-2"
                      onClick={() => handleDeleteCategory(category)}
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

export default AdminListCategories;
