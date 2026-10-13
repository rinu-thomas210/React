
function ProductCard({ name, price, category }) {
  return (
    <article className="product-card">
      <h3>{name}</h3>
      <p>Price: ₹{price}</p>
      <small className="category">{category}</small>
    </article>
  );
}

export default ProductCard;
