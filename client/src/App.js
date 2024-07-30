import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Admin from "./components/Admin";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Login from "./components/Login";
import { jwtDecode } from "jwt-decode";
import Profile from "./components/Profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import logo from "./assets/img/bookify-logo-big.webp";

axios.defaults.baseURL = "http://localhost:8080/api";

axios.defaults.validateStatus = (status) => {
  return status >= 200 && status < 500;
};

function getToken() {
  return window.localStorage.getItem("token")
}

function isLogged() {
  return getToken() != null;
}

function App() {
  const [products, setProducts] = useState();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loaded, setLoaded] = useState(false);

  const getProducts = async () => {
    try {
      const response = await axios.get("/products/home");
      setProducts(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  const validateToken = async () => {
    try {
      const token = getToken();
      if (!token) {
        setLoaded(true);
        return;
      }

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.get("/users/validate");
      if (!response.data) {
        window.localStorage.removeItem("token");
        axios.defaults.headers.common["Authorization"] = null;
        setLoaded(true);
      } else {
        const decodedObj = jwtDecode(token);
        setName(decodedObj.name);
        setLastName(decodedObj.lastName);
        setEmail(decodedObj.sub);
        setLoaded(true);
      }
    } catch (e) {
      console.error(e);
      setLoaded(true);
    }
  };

  useEffect(() => {
    getProducts();
    validateToken();
  }, []);

  return (
    <main>
      <div className="App">
        {loaded ? (
          <Routes>
            <Route
              path="/"
              element={<Layout isLogged={isLogged()} name={name} />}
            >
              <Route index element={<Home products={products} />} />
            </Route>
            <Route
              path="/admin"
              element={<Layout isLogged={isLogged()} name={name} />}
            >
              <Route index element={<Admin token={getToken()} />} />
            </Route>
            <Route
              path="/register"
              element={<Layout isLogged={isLogged()} name={name} />}
            >
              <Route index element={<Register />} />
            </Route>
            <Route
              path="/login"
              element={<Layout isLogged={isLogged()} name={name} />}
            >
              <Route index element={<Login isLogged={isLogged()} />} />
            </Route>
            <Route
              path="/profile"
              element={<Layout isLogged={isLogged()} name={name} />}
            >
              <Route
                index
                element={
                  <Profile isLogged={isLogged()} email={email} name={name} lastName={lastName} onUpdate={validateToken} />
                }
              />
            </Route>
          </Routes>
        ) : (
          <div className="d-block justify-content-center align-items-center min-vh-100 bg-primary text-white">
            <div>
              <img
                src={logo}
                className="bg-secondary rounded mt-5"
                width="150px"
                alt="Bookify"
              />
            </div>
            <FontAwesomeIcon className="mt-5" icon={faSpinner} spin size="3x" />
          </div>
        )}
        <Footer />
      </div>
    </main>
  );
}

export default App;
