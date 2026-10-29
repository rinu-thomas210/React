
import { useDispatch } from "react-redux";
import { Row, Col, Button, Image } from "react-bootstrap";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../redux/CartSlice";
import {
  FaPlus,
  FaMinus,
  FaTrash,
} from "react-icons/fa";

function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <Row className="align-items-center g-3 cart-item py-3">
      <Col xs={3} md={2}>
        <Image
          src={item.image}
          alt={item.name}
          className="cart-image"
          rounded
        />
      </Col>

      <Col xs={9} md={4}>
        <h6 className="fw-bold mb-1">{item.name}</h6>
        <small className="text-muted">{item.category}</small>
        <div className="fw-semibold mt-1">
          ₹{item.price.toLocaleString("en-IN")}
        </div>
      </Col>

      <Col xs={7} md={3}>
        <div className="d-flex align-items-center gap-2">
          <Button
            variant="outline-secondary"
            size="sm"
            aria-label={`Decrease ${item.name} quantity`}
            disabled={item.quantity <= 1}
            onClick={() => dispatch(decreaseQuantity(item.id))}
          >
            <FaMinus />
          </Button>

          <span className="quantity-value">{item.quantity}</span>

          <Button
            variant="outline-secondary"
            size="sm"
            aria-label={`Increase ${item.name} quantity`}
            onClick={() => dispatch(increaseQuantity(item.id))}
          >
            <FaPlus />
          </Button>
        </div>
      </Col>

      <Col xs={5} md={3} className="text-end">
        <div className="fw-bold mb-2">
          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
        </div>

        <Button
          variant="outline-danger"
          size="sm"
          aria-label={`Remove ${item.name} from cart`}
          onClick={() => dispatch(removeFromCart(item.id))}
        >
          <FaTrash className="me-1" />
          Remove
        </Button>
      </Col>
    </Row>
  );
}

export default CartItem;
