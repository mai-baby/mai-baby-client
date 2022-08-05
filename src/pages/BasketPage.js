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

import Basket from "../components/Basket";

function BasketPage(props) {
  const { cartItems, setCartItems } = props;

  const onAdd = (product) => {
    const existingCartItem = cartItems.find((item) => item._id === product._id);
    if (existingCartItem) {
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id
            ? { ...existingCartItem, quantity: existingCartItem.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const onRemove = (product) => {
    const existingCartItem = cartItems.find((item) => item._id === product._id);
    if (existingCartItem.quantity === 1) {
      setCartItems(cartItems.filter((item) => item._id !== product._id));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id
            ? {
                ...existingCartItem,
                quantity: existingCartItem.quantity - 1,
              }
            : item
        )
      );
    }
  };

  return (
    <Row>
      <Col>
        <h2>Products</h2>
        {props.products.map((product) => {
          return (
            <Col>
              <h4>{product.title}</h4>
              <p>{product.price}</p>
              <Image src={product.imageURL} fluid />
              <div className="text-center">
                <Button onClick={() => onAdd(product)}>Add to Cart</Button>
              </div>
            </Col>
          );
        })}
      </Col>
      <Col>
        <Basket cartItems={cartItems} onAdd={onAdd} onRemove={onRemove} />
      </Col>
    </Row>
  );
}

export default BasketPage;
