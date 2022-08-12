import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

import { Row, Col, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function OrderDetailsPage(props) {
  const [order, setOrder] = useState(null);

  const { orderId } = useParams();
  const navigate = useNavigate();

  const getOrder = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(process.env.REACT_APP_API_URL + "/api/orders/" + orderId, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneOrder = response.data;
        setOrder(oneOrder);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getOrder();
  }, []);

  const deleteItemFromOrder = (itemId) => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .put(
        process.env.REACT_APP_API_URL + "/api/orders/" + orderId + "/" + itemId,
        undefined,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then(() => {
        getOrder();
        navigate(`/orders/${orderId}`);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteOrder = (orderId) => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .delete(process.env.REACT_APP_API_URL + "/api/orders/" + orderId, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        navigate(`/orders`);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const formattedDate = order?.updatedAt?.split("T")[0];

  return (
    <div className="OrderDetailsPage">
      <h1 className="text-center m-2">Order Details</h1>
      <hr />
      <Link to={"/orders/edit/" + orderId}>
        <Button>Edit Order</Button>
      </Link>
      <Button
        variant="danger"
        onClick={() => {
          deleteOrder(orderId);
        }}
      >
        Cancel Order
      </Button>
      <Link to="/orders">
        <Button>Back to Orders</Button>
      </Link>
      <Row>
        <Col className="text-left">
          <h3>Shipment Details</h3>
          <h6>
            Full Name:
            <br />
            {order?.address.fullname}
          </h6>
          <h6>
            Street:
            <br />
            {order?.address.street}
          </h6>
          <h6>
            Postal:
            <br />
            {order?.address.postal}
          </h6>
          <h6>
            City:
            <br />
            {order?.address.city}
          </h6>
          <h6>
            State:
            <br />
            {order?.address.state}
          </h6>
          <h6>
            Country:
            <br />
            {order?.address.country}
          </h6>
        </Col>
        <Col>
          <p>Status: {order?.status}</p>
          <p>Sent to: {order?.address.fullname}</p>
          <p>Subtotal: {order?.totalPrice}€</p>
          <p>Order Date: {formattedDate}</p>
          <p>Order ID: {order?._id}</p>
        </Col>
      </Row>

      <Row className="px-4">
        {order?.products.map((item) => {
          return (
            <div>
              <Col
                className="ProductCard card mx-auto"
                style={{ border: "none", maxWidth: "200px" }}
                key={item._id}
              >
                <Card style={{ border: "none" }}>
                  <Row
                    className="d-flex justify-content-center
                      align-items-center"
                  >
                    <Link className="text-center" to={`/products/${item._id}`}>
                      <Card.Img src={item.imageURL} />
                    </Link>
                  </Row>
                  <Row>
                    <Link to={`/products/${item._id}`}>
                      <Card.Title>{item.title}</Card.Title>
                      <Card.Text className="text-center">
                        {item.price}€
                      </Card.Text>
                    </Link>
                  </Row>
                </Card>
                <div className="text-center">
                  <Button
                    onClick={() => {
                      deleteItemFromOrder(item._id);
                    }}
                  >
                    Remove from Order
                  </Button>
                </div>
                <hr />
              </Col>
            </div>
          );
        })}
      </Row>
    </div>
  );
}

export default OrderDetailsPage;
