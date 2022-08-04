import {
  Container,
  Row,
  Col,
  Button,
  Alert,
  Breadcrumb,
  Card,
  Form,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <Container>
        <Breadcrumb>
          <Breadcrumb.Item href="/">Test 1</Breadcrumb.Item>
          <Breadcrumb.Item href="/" active>
            Test 2
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/">Test 3</Breadcrumb.Item>
          <Breadcrumb.Item href="/">Test 4</Breadcrumb.Item>
        </Breadcrumb>
        <Alert variant="success">This is the Alert</Alert>
      </Container>
    </div>
  );
}

export default HomePage;
