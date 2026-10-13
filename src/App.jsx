
import ProductCard from "./product";
import "./App.css";

const products = [
  { id: 1, name: "Laptop", price: 50000, category: "Electronics" },
  { id: 2, name: "Headphones", price: 2000, category: "Accessories" },
  { id: 3, name: "Keyboard", price: 1500, category: "Accessories" },
  { id: 4, name: "Mouse", price: 1000, category: "Accessories" },
];

function App() {
  return (
    <main className="page">
      <h1>Our Products</h1>
      <p className="intro">Explore our latest products</p>

      <section className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            category={product.category}
          />
        ))}
      </section>
    </main>
  );
}

export default App;
