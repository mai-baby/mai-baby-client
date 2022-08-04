import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function ProductDetailsPage(props) {
  const [product, setProduct] = useState(null);

  const { productId } = useParams();

  const getProduct = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneProduct = response.data;
        setProduct(oneProduct);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="ProductDetails">
      {product && (
        <>
          <Image src={product.imageURL} alt="{product.title}" fluid />
          <h1>{product.title}</h1>
          <p>{product.price}</p>
          <p>{product.short_desc}</p>
        </>
      )}
      <Link to={`/products/edit/${productId}`}>
        <button>Edit</button>
      </Link>
      <Link to="/products">
        <button>Back to products</button>
      </Link>
    </div>
  );
}

export default ProductDetailsPage;
