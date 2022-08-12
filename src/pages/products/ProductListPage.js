import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import React, { useState, useEffect } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

function ProductListPage(props) {
  const { isLoggedIn } = useContext(AuthContext);

  const { onAdd } = props;

  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  const [message, setMessage] = useState(false);

  useEffect(() => {
    props.getAllProducts();

    const query = new URLSearchParams(window.location.search);

    if (query.get("canceled")) {
      setMessage(true);
    }
  }, []);

  return (
    <div className="ProductListPage">
      <h1 className="text-center m-2">
        Discover the Brand New NBA Kids Collection!
      </h1>
      <hr />
      <Row className="px-4">
        {props.products.map((product) => {
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
              <Card className="p-2 h-100 my-2">
                <Link className="text-center" to={`/products/${product._id}`}>
                  <Card.Img src={product.imageURL} />
                </Link>
                <h3
                  style={{ fontSize: "2.5rem" }}
                  className="pricetag mt-2 mb-1 ms-auto px-2"
                >
                  {product.price}€
                </h3>
                <Row className="h-100">
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "black",
                    }}
                    to={`/products/${product._id}`}
                  >
                    <h3 className="px-3">{product.title}</h3>
                  </Link>
                </Row>
                <Row className="text-center d-inline my-3">
                  <Link className="text-center" to={`/products/${product._id}`}>
                    <Button>Details</Button>
                  </Link>

                  {isLoggedIn && (
                    <Button
                      style={{ width: "120px" }}
                      variant="outline-warning"
                      className="mx-2"
                      onClick={() => onAdd(product)}
                    >
                      Add to Cart
                    </Button>
                  )}
                </Row>
              </Card>
            </Col>
          );
        })}
      </Row>
      {message ? (
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Oops!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Something went wrong with your payment - please try again!
          </Modal.Body>
          <Modal.Footer>
            <Link to={"/products"}>
              <Button variant="warning" onClick={handleClose}>
                Products
              </Button>
            </Link>
          </Modal.Footer>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
}

export default ProductListPage;
