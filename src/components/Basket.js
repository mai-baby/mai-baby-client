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
    <aside>
      <h2>Cart Items</h2>
      <div>{props.cartItems.length === 0 && <div>Your cart is empty</div>}</div>
      {props.cartItems.map((item) => (
        <Row key={item._id}>
          <h3>{item.title}</h3>
          {/* <Image src={item.imageURL} alt={item.title} /> */}
          <Button onClick={() => props.onAdd(item)} className="addButton">
            +
          </Button>
          <Button onClick={() => props.onRemove(item)} className="removeButton">
            -
          </Button>
          <h4>
            {item.quantity} x {item.price.toFixed(2)}€
          </h4>
        </Row>
      ))}
      {props.cartItems.length !== 0 && (
        <>
          <hr></hr>
          <Row>
            <Col>
              <h3>Items Price</h3>
            </Col>
            <Col>
              <h4>{itemsPrice.toFixed(2)}€</h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <h3>Tax</h3>
            </Col>
            <Col>
              <h4>{taxPrice.toFixed(2)}€</h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <h3>Shipping</h3>
            </Col>
            <Col>
              <h4>{shippingPrice.toFixed(2)}€</h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <h3>Total</h3>
            </Col>
            <Col>
              <h2>{totalPrice.toFixed(2)}€</h2>
            </Col>
          </Row>
          <hr></hr>
          <Row>
            <Button variant="danger">Checkout</Button>
          </Row>
        </>
      )}
    </aside>
  );
}

export default Basket;
