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
import Search from "./components/Search";
import ConfirmUser from "./components/ConfirmUser";
import { publish } from "./events";
import ProductInfo from "./components/ProductInfo";
import Loading from "./components/Loading";
import Reservations from "./components/Reservations";

axios.defaults.baseURL = "https://bookify.website/api";

axios.defaults.validateStatus = (status) => {
  return status >= 200 && status <= 500;
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
  const [categories, setCategories] = useState([]);
  const userRef = useRef(user);
  const productRef = useRef(products);
  const categoriesRef = useRef(categories);

  useEffect(() => {
    getProducts();
    getCategories();
    validateToken();
  }, []);

  useEffect(() => {
    productRef.current = products;
  }, [products]);

  useEffect(() => {
    categoriesRef.current = categories;
  }, [categories]);

  useEffect(() => {
    // create websocket
    if (ws == null) {
      //const ws = new WebSocket("ws://localhost:8080/api/ws");
      const ws = new WebSocket("wss://bookify.website/api/ws");

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

  const updateCategoryEvent = async (categoryId) => {
    try {
      const response = await axios.get(`/categories/get/${categoryId}`);
      if (response.status != 200) {
        return;
      }
      const category = response.data;

      const newCategories = [...categoriesRef.current];
      const index = newCategories.findIndex((it) => it.id == categoryId);
      if (index == -1) {
        newCategories.push(category);
        setCategories([...newCategories]);
        return;
      }

      newCategories[index] = category;
      setCategories([...newCategories]);
    } catch (e) {
      console.error(e);
    }
  };

  const deleteCategoryEvent = (categoryId) => {
    const newCategories = categoriesRef.current.filter(
      (it) => it.id != categoryId
    );
    setCategories(newCategories);
  };

  const getProducts = async () => {
    try {
      const response = await axios.get("/products/home");
      if (response.status != 200) return;
      setProducts(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  const getCategories = async () => {
    try {
      const response = await axios.get("/categories");
      if (response.status != 200) return;
      setCategories(response.data);
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

  const handleEventMessage = (event, ...args) => {
    switch (event) {
      case "updateUser":
        // renovate jwt for some change
        if (userRef.current && args[0] === userRef.current.id) {
          validateToken();
        }
        break;
      case "updateProduct": {
        const productId = args[0];
        updateProductEvent(productId);
        publish("updateProduct", productId);
        break;
      }
      case "deleteProduct": {
        deleteProductEvent(args[0]);
        publish("deleteProduct", args[0]);
        break;
      }
      case "createCategory": {
        updateCategoryEvent(args[0]);
        publish("createCategory", args[0]);
        break;
      }
      case "updateCategory": {
        updateCategoryEvent(args[0]);
        publish("updateCategory", args[0]);
        break;
      }
      case "deleteCategory": {
        deleteCategoryEvent(args[0]);
        publish("deleteCategory", args[0]);
        break;
      }
      case "updateWishlist": {
        publish("updateWishlist", args[0]);
        break;
      }
      case "updateReservation": {
        publish("updateReservation", [args[0], args[1]]);
        break;
      }
      case "createReview": {
        publish("createReview", [args[0], args[1], args[2]]);
        break;
      }
      default:
        console.log("Unknown event type: ", event);
    }
  };

  const updateProductEvent = async (productId) => {
    try {
      const response = await axios.get(`/products/get/${productId}`);
      if (response.status != 200) return;
      
      const product = response.data;
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

  const deleteProductEvent = (productId) => {
    const newProducts = productRef.current.filter((it) => it.id != productId);
    setProducts(newProducts);
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
            <Route path="/search" element={<Layout user={user} />}>
              <Route index element={<Search categories={categories} />} />
            </Route>
            <Route path="/confirm" element={<Layout user={user} />}>
              <Route index element={<ConfirmUser />} />
            </Route>
            <Route path="/product" element={<Layout user={user} />}>
              <Route index element={<ProductInfo />} />
            </Route>
            <Route path="/reservations" element={<Layout user={user} />}>
              <Route index element={<Reservations />} />
            </Route>
          </Routes>
        ) : (
          <Loading />
        )}
        <Footer />
      </div>
    </main>
  );
}

export default App;
