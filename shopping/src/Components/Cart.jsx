
import { useSelector, useDispatch } from "react-redux";
import { Container, Card, Button } from "react-bootstrap";
import { clearCart } from "../redux/CartSlice";
import CartItem from "./CartItem";
import { FaShoppingBag } from "react-icons/fa";

function Cart() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <Container className="pb-5" id="cart">
      <div className="mb-4">
        <h2 className="fw-bold">Your Shopping Cart</h2>
        <p className="text-muted mb-0">
          {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      <Card className="border-0 shadow-sm cart-card">
        <Card.Body className="p-3 p-md-4">
          {items.length === 0 ? (
            <div className="empty-cart text-center py-5">
              <FaShoppingBag size={45} className="mb-3 text-secondary" />
              <h5>Your cart is empty</h5>
              <p className="text-muted mb-0">
                Add some products to get started!
              </p>
            </div>
          ) : (
            <>
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}

              <div className="d-flex justify-content-end mt-3">
                <Button
                  variant="outline-danger"
                  onClick={() => dispatch(clearCart())}
                >
                  Clear Cart
                </Button>
              </div>
            </>
          )}
        </Card.Body>
      </Card>

      <Card className="border-0 shadow-sm mt-4 summary-card">
        <Card.Body className="p-4">
          <h5 className="fw-bold mb-3">Cart Summary</h5>

          <div className="d-flex justify-content-between mb-2">
            <span>Total Items</span>
            <span>{totalItems}</span>
          </div>

          <div className="d-flex justify-content-between mb-3">
            <span>Total Price</span>
            <span className="fw-bold fs-5 text-primary">
              ₹{totalPrice.toLocaleString("en-IN")}
            </span>
          </div>

          <Button
            variant="primary"
            className="w-100"
            disabled={items.length === 0}
            onClick={() =>
              window.alert("Checkout is outside this assignment's scope.")
            }
          >
            Proceed to Checkout
          </Button>

          <p className="text-muted small mt-2 mb-0">
            Demo only — no payment or order processing.
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Cart;
