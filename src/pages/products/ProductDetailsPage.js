import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

import { Row, Col, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function ProductDetailsPage(props) {
  const { isLoggedIn, user } = useContext(AuthContext);

  const { onAdd } = props;

  const [product, setProduct] = useState(null);

  const { productId } = useParams();
  const navigate = useNavigate();

  const getProduct = () => {
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

  const deleteProduct = (productId) => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .delete(process.env.REACT_APP_API_URL + "/api/products/" + productId, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        navigate(`/products`);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="ProductDetails d-flex m-4 justify-content-center">
      {product && (
        <Card className="m-4" style={{ width: "80vw" }}>
          <Row>
            <Col className="col-4 d-flex justify-content-center align-items-center">
              <Card.Img
                src={product.imageURL}
                alt="{product.title}"
                style={{ maxWidth: "300px" }}
                fluid="true"
              />
            </Col>
            <Col className="col-8">
              <Card.Body>
                <h1 className="product-title">{product.title}</h1>
                <h1 className="pricetag">{product.price}€</h1>
                <br />
                <h4 className="description">Description</h4>
                <p className="product-text">{product.shortDescription}</p>
                {/* <Card.Text>Description: {product.longDescription}</Card.Text> */}
                <h4 className="brand">Brand</h4>
                <p className="product-text">{product.brand}</p>
                {isLoggedIn && (
                  <>
                    <Button variant="warning" onClick={() => onAdd(product)}>
                      Add to Cart
                    </Button>
                  </>
                )}

                {!isLoggedIn && (
                  <>
                    <Link to="/login">
                      <Button variant="warning">Add to Cart</Button>
                    </Link>
                  </>
                )}
                <Link to="/products">
                  <Button variant="primary" className="m-4">
                    Back to products
                  </Button>
                </Link>
                {user?.isAdmin && (
                  <>
                    <Link to={`/products/edit/${productId}`}>
                      <Button variant="outline-primary" className="m-4">
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="outline-danger"
                      className="m-4"
                      onClick={() => {
                        deleteProduct(productId);
                      }}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </Card.Body>
            </Col>
          </Row>
        </Card>
      )}
    </div>
  );
}

export default ProductDetailsPage;
