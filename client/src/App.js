import { useEffect, useState, useRef } from "react";
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
  return window.localStorage.getItem("token");
}

function isLogged() {
  return getToken() != null;
}

function App() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [ws, setWs] = useState(null);
  const userRef = useRef(user);
  const productRef = useRef(products);

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
      // no token, no user.
      const token = getToken();
      if (!token) {
        setLoaded(true);
        return;
      }

      // token detected, validate it
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.get("/users/validate");

      switch (response.status) {
        case 401: {
          // if token is invalid, remove it
          window.localStorage.removeItem("token");
          axios.defaults.headers.common["Authorization"] = null;
          setLoaded(true);
          return;
        }
        case 200: {
          // token is valid, setup user
          setupUser(token);
          break;
        }
        case 202: {
          // backend tells me to renovate token, is valid but with some changes
          const renovate = await axios.get("/users/renovate");

          // if renovate fails, remove token
          if (renovate.status != 200) {
            window.localStorage.removeItem("token");
            axios.defaults.headers.common["Authorization"] = null;
            setLoaded(true);
            return;
          }

          // here we have a new token, create user admin and set it
          window.localStorage.setItem("token", renovate.data);
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${renovate.data}`;
          setupUser(renovate.data);
        }
      }
    } catch (e) {
      console.error(e);
      window.localStorage.removeItem("token");
      axios.defaults.headers.common["Authorization"] = null;
      setLoaded(true);
    }
  };

  const setupUser = (token) => {
    // valid token, decode it
    const decodedObj = jwtDecode(token);
    const user = {
      id: decodedObj.id,
      email: decodedObj.sub,
      name: decodedObj.name,
      lastName: decodedObj.lastName,
      isAdmin: decodedObj.isAdmin,
    };
    setUser(user);
    userRef.current = user;
    setLoaded(true);
  };

  useEffect(() => {
    getProducts();
    validateToken();
  }, []);

  useEffect(() => {
    productRef.current = products;
  }, [products]);

  useEffect(() => {
    // create websocket
    if (ws == null) {
      const ws = new WebSocket("ws://localhost:8080/websocket-endpoint");

      ws.onmessage = (message) => {
        const eventMessage = JSON.parse(message.data);
        // split eventName and arguments
        const [...args] = eventMessage.data;
        handleEventMessage(eventMessage.event, ...args);
      };

      setWs(ws);
    }

    // Clean up WebSocket connection when component unmounts or ws changes
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [loaded]);

  const handleEventMessage = (event, ...args) => {
    switch (event) {
      case "updateUser":
        // renovate jwt for some change
        if (userRef.current && args[0] === userRef.current.id) {
          validateToken();
        }
        break;
      case "updateProduct": {
        // get specific product updated
        const productId = args[0];
        if (productRef.current.find((it) => it.id == productId)) {
          updateProductFromList(productId);
        }
        break;
      }
      default:
        console.log("Unknown event type: ", event);
    }
  };

  const updateProductFromList = async (productId) => {
    try {
      const response = await axios.get(`/products/get/${productId}`);
      const product = response.data;
      const newProducts = [...productRef.current];
      const index = newProducts.findIndex((it) => it.id == productId);

      if (!product) {
        newProducts.splice(index, 1);
      } else {
        newProducts[index] = product;
      }

      setProducts(newProducts);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main>
      <div className="App">
        {loaded ? (
          <Routes>
            <Route path="/" element={<Layout user={user} />}>
              <Route index element={<Home products={products} />} />
            </Route>
            <Route path="/admin" element={<Layout user={user} />}>
              <Route index element={<Admin token={getToken()} user={user} />} />
            </Route>
            <Route path="/register" element={<Layout user={user} />}>
              <Route index element={<Register />} />
            </Route>
            <Route path="/login" element={<Layout user={user} />}>
              <Route index element={<Login isLogged={isLogged()} />} />
            </Route>
            <Route path="/profile" element={<Layout user={user} />}>
              <Route
                index
                element={<Profile user={user} onUpdate={validateToken} />}
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
