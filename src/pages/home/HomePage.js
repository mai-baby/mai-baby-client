import {
  Container,
  Row,
  Col,
  Button,
  Alert,
  Breadcrumb,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import ControlledCarousel from "../../components/home/ControlledCarousel";

function HomePage(props) {
  return (
    <div>
      <ControlledCarousel
        products={props.products}
        getAllProducts={props.getAllProducts}
      />
    </div>
  );
}

export default HomePage;
