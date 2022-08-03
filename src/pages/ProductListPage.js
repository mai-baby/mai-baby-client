import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddProduct from "../components/AddProduct";

function ProductListPage() {
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

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="ProductListPage">
      <AddProduct refreshProducts={getAllProducts} />
      <hr />

      {products.map((product) => {
        return (
          <div className="ProductCard card" key={product._id}>
            <Link to={`/products/${product._id}`}>
              <h3>{product.title}</h3>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default ProductListPage;
