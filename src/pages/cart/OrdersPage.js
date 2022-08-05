import { useEffect } from "react";
import { Link } from "react-router-dom";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

function OrdersPage(props) {
  const { getAllOrders, orders } = props;

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <div className="OrdersPage">
      <h1 className="text-center m-2">Here are your most recent orders!</h1>
      <hr />
      <Row className="px-4">
        {orders.map((order) => {
          return (
            <Col
              xs={12}
              sm={6}
              md={4}
              lg={4}
              className="ProductCard card"
              style={{ border: "none" }}
              key={order._id}
            >
              <Card className="p-2 my-4" style={{ border: "none" }}>
                <Link className="text-center" to={`/orders/${order._id}`}>
                  <div>
                    <Row className="my-4">
                      {order.products.map((product, i) => {
                        if (order.products.length === 2) {
                          return (
                            <>
                              <Col style={{ padding: "0" }} className="col-6">
                                <Card.Img src={product.imageURL} fluid="true" />
                              </Col>
                              <Col style={{ padding: "0" }} className="col-6">
                                <Card.Img src={product.imageURL} fluid="true" />
                              </Col>
                            </>
                          );
                        } else if (i < 4) {
                          return (
                            <Col style={{ padding: "0" }} className="col-6">
                              <Card.Img src={product.imageURL} fluid="true" />
                            </Col>
                          );
                        }
                      })}
                    </Row>
                  </div>
                  <Card.Title>Status: {order.status}</Card.Title>
                </Link>
                <Card.Text className="text-center">
                  Total price of this order was: {order.totalPrice}€
                </Card.Text>
              </Card>
              <div className="text-center">
                <Button>Cancel Order</Button>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default OrdersPage;
