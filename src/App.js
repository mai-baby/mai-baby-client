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
import OrdersPage from "./pages/cart/OrdersPage";
import OrderDetailPage from "./pages/cart/OrderDetailPage";
import EditOrderPage from "./pages/cart/EditOrderPage";
import IsPrivate from "./components/auth/IsPrivate";
import IsAnon from "./components/auth/IsAnon";
import IsAdmin from "./components/auth/IsAdmin";

function App() {
  // Shopping Cart Functions

  const [cartItems, setCartItems] = useState([]);
  const itemsPrice = cartItems.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.price * currentValue.quantity,
    0
  );
  const shippingPrice = itemsPrice > 50 ? 0 : 5;
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

        <Route
          path="/products/create"
          element={
            <IsAdmin>
              <CreateProductPage />
            </IsAdmin>
          }
        />

        <Route
          path="/products/:productId"
          element={<ProductDetailsPage onAdd={onAdd} />}
        />

        <Route
          path="/products/edit/:productId"
          element={
            <IsAdmin>
              <EditProductPage />
            </IsAdmin>
          }
        />

        <Route
          path="/register"
          element={
            <IsAnon>
              <RegisterPage />
            </IsAnon>
          }
        />

        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />

        <Route
          path="/basket"
          element={
            <IsPrivate>
              <BasketPage
                cartItems={cartItems}
                totalPrice={totalPrice}
                onAdd={onAdd}
                onRemove={onRemove}
                shippingPrice={shippingPrice}
                itemsPrice={itemsPrice}
                setCartItems={setCartItems}
              />
            </IsPrivate>
          }
        />

        <Route
          path="/checkout"
          element={
            <IsPrivate>
              <CheckoutPage
                cartItems={cartItems}
                totalPrice={totalPrice}
                setCartItems={setCartItems}
              />
            </IsPrivate>
          }
        />

        <Route
          path="/orders"
          element={
            <IsPrivate>
              <OrdersPage orders={orders} getAllOrders={getAllOrders} />
            </IsPrivate>
          }
        />

        <Route
          path="/orders/:orderId"
          element={
            <IsPrivate>
              <OrderDetailPage />
            </IsPrivate>
          }
        />

        <Route
          path="/orders/edit/:orderId"
          element={
            <IsPrivate>
              <EditOrderPage />
            </IsPrivate>
          }
        />
        <Route
          path="/:badrequest"
          element={
            <HomePage products={products} getAllProducts={getAllProducts} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
