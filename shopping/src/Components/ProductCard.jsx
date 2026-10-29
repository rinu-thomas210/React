
import { useDispatch } from "react-redux";
import { Card, Button, Badge } from "react-bootstrap";
import { FaCartPlus } from "react-icons/fa";
import { addToCart } from "../redux/CartSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <Card className="product-card h-100 border-0 shadow-sm">
      <Card.Img
        variant="top"
        src={product.image}
        alt={product.name}
        className="product-image"
      />

      <Card.Body className="d-flex flex-column">
        <Badge bg="light" text="dark" className="category-badge">
          {product.category}
        </Badge>

        <Card.Title className="mt-3">
          {product.name}
        </Card.Title>

        <h5 className="product-price mb-3">
          ₹{product.price.toLocaleString("en-IN")}
        </h5>

        <Button
          variant="primary"
          className="mt-auto add-button"
          onClick={() => dispatch(addToCart(product))}
        >
          <FaCartPlus className="me-2" />
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
