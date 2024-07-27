import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

axios.defaults.baseURL = "http://localhost:8080/api";

axios.defaults.validateStatus = (status) => {
  return status >= 200 && status < 500;
};

axios.interceptors.response.use((response) => {
  if (response.status === 401) {
    console.log("Unauthorized");
  }
  return response;
});

function App() {
  const [products, setProducts] = useState();
  const getProducts = async () => {
    try {
      const response = await axios.get("/products/home");
      setProducts(response.data);
      console.log(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <main>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home products={products} />} />
          </Route>
        </Routes>
      </div>
    </main>
  );
}

export default App;
