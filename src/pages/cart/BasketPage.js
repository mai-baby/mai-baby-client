import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Basket from "../../components/cart/Basket";

function BasketPage(props) {
  const { cartItems, onAdd, onRemove, totalPrice, shippingPrice, itemsPrice } =
    props;

  return (
    <Row>
      <Col>
        <Basket
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          totalPrice={totalPrice}
          shippingPrice={shippingPrice}
          itemsPrice={itemsPrice}
        />
      </Col>
    </Row>
  );
}

export default BasketPage;
