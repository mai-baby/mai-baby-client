import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

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
          <h1>{product.title}</h1>
          <p>{product.description}</p>
        </>
      )}
      {product &&
        product.tasks.map((task) => (
          <li className="TaskCard card" key={task._id}>
            <h3>{task.title}</h3>
            <h4>Description:</h4>
            <p>{task.description}</p>
          </li>
        ))}
      <Link to={`/products/edit/${productId}`}>
        <button>Edit</button>
      </Link>
      &nbsp;
      <Link to="/products">
        <button>Back to products</button>
      </Link>
    </div>
  );
}

export default ProductDetailsPage;
