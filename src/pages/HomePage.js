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
        <Form>
          <Row>
            <Col md>
              <Form.Group controlId="formEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="Your email address" />
                <Form.Text>Don't share your email!</Form.Text>
              </Form.Group>
            </Col>
            <Col md>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Your password" />
                <Form.Text>Don't share your password!</Form.Text>
              </Form.Group>
            </Col>
          </Row>
          <Button className="mt-3" variant="secondary">
            Login
          </Button>
        </Form>

        <Card style={{ width: "40vw" }} className="m-4">
          <Card.Img src="http://images6.fanpop.com/image/photos/41500000/adorable-puppies-cute-puppies-41538772-1920-1080.jpg" />
          <Card.Body>
            <Card.Title>Card Example</Card.Title>
            <Card.Text>This is an example of a bootstrap card.</Card.Text>
          </Card.Body>
          <Button>Test Button</Button>
        </Card>
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
