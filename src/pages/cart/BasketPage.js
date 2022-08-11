import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Breadcrumb,
  Image,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { Link } from "react-router-dom";
import Basket from "../../components/cart/Basket";

function BasketPage(props) {
  const {
    products,
    cartItems,
    totalPrice,
    onAdd,
    onRemove,
    shippingPrice,
    itemsPrice,
  } = props;
  return (
    <Basket
      products={products}
      cartItems={cartItems}
      totalPrice={totalPrice}
      onAdd={onAdd}
      onRemove={onRemove}
      shippingPrice={shippingPrice}
      itemsPrice={itemsPrice}
    />
  );
}

export default BasketPage;
