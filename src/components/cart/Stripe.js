import { Row, Col, Button, Form, Breadcrumb, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

function Basket(props) {
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      line_items: [
        {
          price_data: {
            currency: "EUR",
            product_data: {
              name: "MJ Jersey",
            },
            unit_amount: 20000, // price, how much to charge
            // adjustable_quantity: enabled,
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: "EUR",
            product_data: {
              name: "Kobe AD Shoes",
            },
            unit_amount: 18000, // price, how much to charge
            // adjustable_quantity: enabled,
          },
          quantity: 2,
        },
      ],
    };

    // let cartItems;

    // let lineItems = cartItems.map((lineItem) => {
    //   return {
    //     price_data: {
    //       currency: "EUR",
    //       product_data: {
    //         name: lineItem.title,
    //       },
    //       unit_amount: lineItem.price * 100,
    //     },
    //     quantity: 1,
    //   };
    // });

    // let reqBody = { lineItems };

    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // axios.post(url, body, config)

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/create-checkout-session`,
        requestBody,
        {
          // headers: { Authorization: `Bearer ${storedToken}` },
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((resultJSON) => {
        // props.setCartItems([]);
        console.log(resultJSON);
        window.location.href = resultJSON.data.url;
        console.log("redirect successful!");
        // navigate(`/confirmation`);
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
