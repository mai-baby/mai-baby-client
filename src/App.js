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
import CheckoutPage from "./pages/cart/CheckoutPage";
import ConfirmationPage from "./pages/cart/ConfirmationPage";
import OrdersPage from "./pages/cart/OrdersPage";
// import IsPrivate from "./components/auth/IsPrivate";
// import IsAnon from "./components/auth/IsAnon";

function App() {
  // Shopping Cart Functions

  const [cartItems, setCartItems] = useState([]);
  const itemsPrice = cartItems.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.price * currentValue.quantity,
    0
  );
  const shippingPrice = itemsPrice > 50 ? 0 : 5; // free shipping from 50€
  const totalPrice = itemsPrice + shippingPrice;

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

  // Products Functions

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

  // Orders Functions

  const [orders, setOrders] = useState([]);

  const getAllOrders = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/orders`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setOrders(response.data))
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
              totalPrice={totalPrice}
              onAdd={onAdd}
              onRemove={onRemove}
              shippingPrice={shippingPrice}
              itemsPrice={itemsPrice}
            />
          }
        />
        <Route
          path="/checkout"
          element={
            <CheckoutPage cartItems={cartItems} totalPrice={totalPrice} />
          }
        />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route
          path="/orders"
          element={<OrdersPage orders={orders} getAllOrders={getAllOrders} />}
        />
      </Routes>
    </div>
  );
}

export default App;
