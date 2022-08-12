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
      <Row className="px-4 ">
        <Col
          className="ProductCard card col-12 mx-auto"
          style={{ border: "none", maxWidth: "600px" }}
        >
          {orders.map((order) => {
            const formattedDate = order?.updatedAt?.split("T")[0];
            return (
              <Row key={order._id}>
                <Col>
                  <Card className="p-4 m-4">
                    <Link className="text-center" to={`/orders/${order._id}`}>
                      <div>
                        <Row className="my-4">
                          {order.products.map((product, i) => {
                            if (order.products.length === 1) {
                              return (
                                <Card.Img
                                  key={product._id}
                                  src={product.imageURL}
                                  fluid="true"
                                />
                              );
                            } else if (order.products.length === 2) {
                              return (
                                <Col
                                  key={product._id}
                                  style={{ padding: "0" }}
                                  className="col-6"
                                >
                                  <Card.Img
                                    src={product.imageURL}
                                    fluid="true"
                                  />
                                </Col>
                              );
                            } else if (i < 4) {
                              return (
                                <Col
                                  key={product._id}
                                  style={{ padding: "0" }}
                                  className="col-6"
                                >
                                  <Card.Img
                                    src={product.imageURL}
                                    fluid="true"
                                  />
                                </Col>
                              );
                            }
                          })}
                        </Row>
                      </div>
                    </Link>
                  </Card>
                </Col>
                <Col className="text-left p-2 my-auto">
                  <p>Status: {order?.status}</p>
                  <p>Sent to: {order?.address.fullname}</p>
                  <p>Subtotal: {order?.totalPrice}€</p>
                  <p>Order Date: {formattedDate}</p>
                  <p>Order ID: {order?._id}</p>
                  <Link
                    className="d-flex text-center justify-content-center"
                    to={`/orders/${order._id}`}
                  >
                    <Button>Order Details</Button>
                  </Link>
                </Col>
              </Row>
            );
          })}
        </Col>
      </Row>
    </div>
  );
}

export default OrdersPage;
