import React, { useEffect, useState } from "react";
import axios from "axios";
import DialogText from "./DialogText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

const AdminListUsers = ({ selfUser }) => {
  const [users, setUsers] = useState([]);
  const [dialogText, setDialogText] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/users");
      switch (response.status) {
        case 200: {
          setUsers(response.data);
          break;
        }
        case 401: {
          setDialogText("No tienes permisos para ver la lista de usuarios.");
          return;
        }
        default: {
          setDialogText("Error al obtener la lista de usuarios.");
          return;
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleAdmin = async (user) => {
    if (user.id === selfUser.id) {
      setDialogText("No puedes modificar tu propio estado de administrador.");
      return;
    }

    try {
      const response = await axios.post(`/users/update/setAdmin`, {
        id: user.id,
        isAdmin: !user.isAdmin,
      });
      switch (response.status) {
        case 200: {
          fetchUsers();
          break;
        }
        case 401: {
          setDialogText(
            "No tienes permisos para modificar el estado de admnistrador."
          );
          break;
        }
        case 400: {
          setDialogText(
            "El ID del usuario es inválido o estás intentando modificar tu propio estado de administrador."
          );
          break;
        }
        case 404: {
          await fetchUsers();
          setDialogText("El usuario dejó de existir. Intenta de nuevo.");
          break;
        }
        default: {
          setDialogText("Error al modificar el estado de admnistrador.");
          break;
        }
      }
    } catch (error) {
      console.error(error);
      setDialogText("Error al modificar el estado de admnistrador.");
    }
  };

  return (
    <div className="container justify-content-center align-items-center">
      <hr></hr>
      <h1>Usuarios</h1>
      <hr></hr>
      <DialogText text={dialogText} onClose={() => setDialogText("")} onConfirm={() => setDialogText("")} />
      <div className="d-flex flex-column w-100">
        <div className="row w-100">
          {users.map((user, index) => (
            <div key={index} className="col-12 mb-3">
              <div className="row bg-secondary text-white rounded p-4">
                <div className="col">
                  <p className="card-text">
                    User ID: <b>{user.id}</b>
                  </p>
                  <h5 className="text-white">
                    {user.firstName} {user.lastName}
                  </h5>
                  <p className="card-text">
                    Email: {user.email} | Verificado:{" "}
                    {user.isConfirmed ? (
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className="text-success"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faCircleXmark}
                        className="text-danger"
                      />
                    )}
                  </p>
                  <p className="card-text">
                    Administrador:{" "}
                    {user.isAdmin ? (
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className="text-success"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faCircleXmark}
                        className="text-danger"
                      />
                    )}
                  </p>
                </div>

                <div className="col">
                  <div className="d-flex align-items-center justify-content-center">
                    {user.isAdmin ? (
                      <button
                        className="btn btn-danger"
                        onClick={() => toggleAdmin(user)}
                      >
                        Quitar Admin
                      </button>
                    ) : (
                      <button
                        className="btn btn-success"
                        onClick={() => toggleAdmin(user)}
                      >
                        Hacer Admin
                      </button>
                    )}
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

export default AdminListUsers;
