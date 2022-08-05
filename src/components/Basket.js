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

function Basket(props) {
  const itemsPrice = props.cartItems.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.price * currentValue.quantity,
    0
  );
  const taxPrice = itemsPrice * 0.19;
  const shippingPrice = itemsPrice > 50 ? 0 : 5; // free shipping from 50€
  const totalPrice = itemsPrice + taxPrice + shippingPrice;
  return (
    <aside className="m-4">
      <Row>
        <Col>
          <h2>Cart Items</h2>
          <div>
            {props.cartItems.length === 0 && <div>Your cart is empty</div>}
          </div>
          {props.cartItems.map((item) => (
            <Row key={item._id}>
              <h5>{item.title}</h5>
              {/* <Image src={item.imageURL} alt={item.title} /> */}
              <Button
                onClick={() => props.onAdd(item)}
                style={{ width: "60px" }}
              >
                +
              </Button>
              <Button
                onClick={() => props.onRemove(item)}
                style={{ width: "60px" }}
                variant="danger"
              >
                -
              </Button>
              <h6>
                {item.quantity} x {item.price.toFixed(2)}€
              </h6>
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
                  <p>{itemsPrice.toFixed(2)}€</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>Tax</p>
                </Col>
                <Col>
                  <p>{taxPrice.toFixed(2)}€</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>Shipping</p>
                </Col>
                <Col>
                  <p>{shippingPrice.toFixed(2)}€</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>Total</p>
                </Col>
                <Col>
                  <p>{totalPrice.toFixed(2)}€</p>
                </Col>
              </Row>
              <hr></hr>
              <Row>
                <div className="text-center">
                  <Button variant="danger">Checkout</Button>
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
