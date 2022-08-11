import { Row, Col, Button, Form, Breadcrumb, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

function Basket(props) {
  const navigate = useNavigate();

  const {
    products,
    cartItems,
    totalPrice,
    onAdd,
    onRemove,
    shippingPrice,
    itemsPrice,
    setCartItems,
  } = props;

  const handleFormSubmit = (e) => {
    e.preventDefault();

    let lineItems = cartItems.map((lineItem) => {
      return {
        price_data: {
          currency: "EUR",
          product_data: {
            name: lineItem.title,
          },
          unit_amount: lineItem.price * 100,
        },
        quantity: lineItem.quantity,
      };
    });

    let requestBody = {
      line_items: lineItems,
      mode: "payment",
      success_url: `${window.location.origin}/payment?success=true`,
      cancel_url: `${window.location.origin}/payment?canceled=true`,
    };

    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/create-checkout-session`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
        }
      )
      .then((resultJSON) => {
        // props.setCartItems([]);
        window.location.href = resultJSON.data.url;
      })
      .catch((error) => {
        console.log(error);
        // navigate(`/`);
      });
  };

  return (
    <div className="text-center p-1">
      <Form onSubmit={handleFormSubmit}>
        {/* <Form
        action={process.env.REACT_APP_API_URL + "/create-checkout-session"}
        method="POST"
      > */}
        <Button variant="primary" style={{ width: "200px" }} type="submit">
          Pay with Stripe
        </Button>
      </Form>
    </div>
  );
}

export default Basket;
