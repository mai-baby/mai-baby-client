import "./App.css";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

import NavBar from "./components/nav/NavBar";
import HomePage from "./pages/home/HomePage";
import ProductListPage from "./pages/products/ProductListPage";
import ProductDetailsPage from "./pages/products/ProductDetailsPage";
import EditProductPage from "./pages/products/EditProductPage";
import CreateProductPage from "./pages/products/CreateProductPage";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import BasketPage from "./pages/cart/BasketPage";
// import IsPrivate from "./components/auth/IsPrivate";
// import IsAnon from "./components/auth/IsAnon";

function App() {
  // Shopping Cart Functions

  const [cartItems, setCartItems] = useState([]);

  const onAdd = (product) => {
    const existingCartItem = cartItems.find((item) => item._id === product._id);
    if (existingCartItem) {
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id
            ? { ...existingCartItem, quantity: existingCartItem.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const onRemove = (product) => {
    const existingCartItem = cartItems.find((item) => item._id === product._id);
    if (existingCartItem.quantity === 1) {
      setCartItems(cartItems.filter((item) => item._id !== product._id));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id
            ? {
                ...existingCartItem,
                quantity: existingCartItem.quantity - 1,
              }
            : item
        )
      );
    }
  };

  // End of Shopping Cart Functions

  const [products, setProducts] = useState([]);

  const getAllProducts = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/products`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
  };

  return (
    <div className="App">
      <NavBar countCartItems={cartItems.length} />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage products={products} getAllProducts={getAllProducts} />
          }
        />
        <Route
          path="/products"
          element={
            <ProductListPage
              products={products}
              getAllProducts={getAllProducts}
              onAdd={onAdd}
            />
          }
        />
        <Route path="/products/create" element={<CreateProductPage />} />
        <Route path="/products/:productId" element={<ProductDetailsPage />} />
        <Route path="/products/edit/:productId" element={<EditProductPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/basket"
          element={
            <BasketPage
              products={products}
              cartItems={cartItems}
              onAdd={onAdd}
              onRemove={onRemove}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
