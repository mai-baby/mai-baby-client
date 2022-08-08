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
        {/* Add Loading Spinner */}
        {order?.products.map((item) => {
          return (
            <Col
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className="ProductCard card"
              style={{ border: "none" }}
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
      </Row>
      <div className="text-center">
        <Button
          variant="danger"
          onClick={() => {
            deleteOrder(orderId);
          }}
        >
          Delete
        </Button>
        <Link to="/orders">
          <Button>Back to Orders</Button>
        </Link>
      </div>
    </div>
  );
}

export default OrderDetailsPage;
