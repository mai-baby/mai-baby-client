import {
  Container,
  Row,
  Col,
  Button,
  Alert,
  Breadcrumb,
  Image,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { Link } from "react-router-dom";

function Basket(props) {
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
                  <Button variant="primary" style={{ width: "200px" }}>
                    Paypal
                  </Button>
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
