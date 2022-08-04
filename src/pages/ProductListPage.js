import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { Row, Col, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

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
      <h1 className="text-center m-2">
        Discover the Brand New NBA Toddlers Collection!
      </h1>
      <hr />
      <Row className="px-4">
        {products.map((product) => {
          return (
            <Col
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className="ProductCard card"
              style={{ border: "none" }}
              key={product._id}
            >
              <Card className="p-2" style={{ border: "none" }}>
                <Link className="text-center" to={`/products/${product._id}`}>
                  <Card.Img src={product.imageURL} />
                  <Card.Title>{product.title}</Card.Title>
                </Link>
                <Card.Text className="text-center">{product.price}€</Card.Text>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default ProductListPage;
