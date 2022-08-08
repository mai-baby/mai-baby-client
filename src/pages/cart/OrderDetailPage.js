import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

import { Image, Row, Col, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function OrderDetailsPage(props) {
  const [order, setOrder] = useState(null);

  const { orderId } = useParams();
  const navigate = useNavigate();

  const getOrder = () => {
    // Get the token from the localStorage
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
    axios
      .put(
        process.env.REACT_APP_API_URL + "/api/orders/" + orderId + "/" + itemId
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
    axios
      .delete(process.env.REACT_APP_API_URL + "/api/orders/" + orderId)
      .then(() => {
        navigate(`/orders`);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="OrderDetailsPage">
      <h1 className="text-center m-2">Order Details</h1>
      <hr />
      <Row className="px-4">
        <Col>
          {/* Add Loading Spinner */}
          {order?.products.map((item) => {
            return (
              <Col
                xs={12}
                sm={12}
                md={12}
                lg={12}
                className="ProductCard card mx-auto"
                style={{ border: "none", maxWidth: "400px" }}
                key={item._id}
              >
                <Card className="p-2" style={{ border: "none" }}>
                  <Link className="text-center" to={`/products/${item._id}`}>
                    <Card.Img src={item.imageURL} />
                    <Card.Title>{item.title}</Card.Title>
                  </Link>
                  <Card.Text className="text-center">{item.price}€</Card.Text>
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
              </Col>
            );
          })}
        </Col>
        <Col>
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
          <div className="text-left">
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
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default OrderDetailsPage;
