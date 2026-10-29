
import { useSelector } from "react-redux";
import { Navbar, Container, Nav, Badge } from "react-bootstrap";
import { FaShoppingCart, FaStore } from "react-icons/fa";
import ProductList from "./Components/ProductList";
import Cart from "./Components/Cart";
import "./App.css";

function App() {
  const items = useSelector((state) => state.cart.items);

  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      <Navbar expand="lg" className="shop-navbar sticky-top">
        <Container>
          <Navbar.Brand href="#home" className="fw-bold">
            <FaStore className="me-2" />
            Myntra
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="shop-navbar-nav" />

          <Navbar.Collapse id="shop-navbar-nav">
            <Nav className="ms-auto align-items-lg-center gap-lg-3">
              <Nav.Link href="#products">Products</Nav.Link>
              <Nav.Link href="#cart">
                <FaShoppingCart className="me-2" />
                Cart{" "}
                <Badge bg="primary" pill>
                  {totalItems}
                </Badge>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <header className="hero-section" id="home">
        <Container>
          <p className="hero-label">YOUR EVERYDAY SHOPPING DESTINATION</p>
          <h1>Find Your Favorites.</h1>
          <p className="hero-description">
            Discover great products and shop with ease.
          </p>
          <a href="#products" className="btn btn-light hero-button">
            Explore Products
          </a>
        </Container>
      </header>

      <main>
        <ProductList />
        <Cart />
      </main>

      <footer className="text-center py-4">
        <p className="mb-0">
          © 2026 ShopEase | Built with React and Redux Toolkit
        </p>
      </footer>
    </>
  );
}

export default App;
