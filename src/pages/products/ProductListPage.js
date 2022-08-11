import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

function ProductListPage(props) {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  const { onAdd } = props;

  useEffect(() => {
    props.getAllProducts();
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
              <Card className="p-2">
                <Link className="text-center" to={`/products/${product._id}`}>
                  <Card.Img src={product.imageURL} />
                </Link>
                <h3
                  style={{ fontSize: "2.5rem" }}
                  className="pricetag mt-2 mb-1 ms-auto px-2"
                >
                  {product.price}€
                </h3>
                <h3 className="px-3">{product.title}</h3>
                <div className="text-center">
                  <Link className="text-center" to={`/products/${product._id}`}>
                    <Button>Details</Button>
                  </Link>
                  {isLoggedIn && (
                    <Button
                      variant="outline-warning"
                      className="m-3"
                      onClick={() => onAdd(product)}
                    >
                      Add to Cart
                    </Button>
                  )}
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default ProductListPage;
