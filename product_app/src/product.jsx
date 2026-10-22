
function ProductCard({ name, price, category }) {
  return (
    <article className="product-card card h-100">
      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <p className="card-text">Price: ₹{price}</p>
        <span className="badge text-bg-primary">
          {category}
        </span>
      </div>
    </article>
  );
}

export default ProductCard;
