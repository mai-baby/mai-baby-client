import { useEffect } from "react";
import { Link } from "react-router-dom";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";

function ProductListPage(props) {
  useEffect(() => {
    props.getAllProducts();
  }, []);

  return (
    <div className="ProductListPage">
      <h1 className="text-center m-2">
        Discover the Brand New NBA Toddlers Collection!
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
