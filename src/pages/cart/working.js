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
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((session) => {
        // props.setCartItems([]);
        console.log("redirect successful!");
        // navigate(`/confirmation`);
      })
      .catch((error) => {
        console.log(error);
        // navigate(`/`);
      });
  };

  return (
    <aside className="m-4">
      <Row>
        <Col>
          <h2>Cart Items</h2>
          <div>
            {props.cartItems.length === 0 && <div>Your cart is empty</div>}
          </div>
          {props.cartItems.map((item) => (
            <Row className="my-4" key={item._id}>
              <Col>
                <Image
                  src={item.imageURL}
                  alt={item.title}
                  style={{ width: "60px" }}
                />
              </Col>
              <Col>
                <h6>{item.title}</h6>
              </Col>
              <Col>
                <h6 className="text-center">
                  {item.quantity} x {item.price.toFixed(2)}€
                </h6>
                <div className="text-center">
                  <span className="px-1">
                    <Button
                      onClick={() => props.onAdd(item)}
                      style={{ width: "30%" }}
                    >
                      +
                    </Button>
                  </span>
                  <span className="px-1">
                    <Button
                      onClick={() => props.onRemove(item)}
                      style={{ width: "30%" }}
                      variant="danger"
                    >
                      -
                    </Button>
                  </span>
                </div>
              </Col>
              <hr className="my-4" />
            </Row>
          ))}
        </Col>
        <Col>
          {props.cartItems.length !== 0 && (
            <>
              <h1>Summary</h1>
              <hr></hr>
              <Row>
                <Col>
                  <p>Items Price</p>
                </Col>
                <Col>
                  <p>{props.itemsPrice.toFixed(2)}€</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>Shipping</p>
                </Col>
                <Col>
                  <p>{props.shippingPrice.toFixed(2)}€</p>
                </Col>
              </Row>
              <Row>
                <hr></hr>
                <Col>
                  <p>Total</p>
                </Col>
                <Col>
                  <p>{props.totalPrice.toFixed(2)}€</p>
                </Col>
                <hr></hr>
              </Row>
              <Row>
                <div className="text-center p-1">
                  <Link to="/checkout">
                    <Button variant="danger" style={{ width: "200px" }}>
                      Checkout
                    </Button>
                  </Link>
                </div>
              </Row>
              <Row>
                <div className="text-center p-1">
                  <Form onSubmit={handleFormSubmit}>
                    {/* <Form
                    action={
                      process.env.REACT_APP_API_URL + "/create-checkout-session"
                    }
                    method="POST"
                  > */}
                    <Button
                      variant="primary"
                      style={{ width: "200px" }}
                      type="submit"
                    >
                      Pay with Stripe
                    </Button>
                  </Form>
                </div>
              </Row>
            </>
          )}
        </Col>
      </Row>
    </aside>
  );
}

export default Basket;
