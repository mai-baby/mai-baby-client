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

import Basket from "../../components/cart/Basket";

function BasketPage(props) {
  const { cartItems, onAdd, onRemove } = props;

  return (
    <Row>
      <Col>
        <Basket cartItems={cartItems} onAdd={onAdd} onRemove={onRemove} />
      </Col>
    </Row>
  );
}

export default BasketPage;
