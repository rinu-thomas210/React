
import { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import products from "../data/Products";
import ProductCard from "./ProductCard";

function ProductList() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) => product.category === selectedCategory
        );

  return (
    <Container className="py-5" id="products">
      <div className="section-heading d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <h2 className="fw-bold">Explore Products</h2>
          <p className="text-muted mb-0">
            Find something you love.
          </p>
        </div>

        <Form.Select
          value={selectedCategory}
          onChange={(event) =>
            setSelectedCategory(event.target.value)
          }
          className="category-select"
          aria-label="Filter products by category"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category === "All" ? "All Categories" : category}
            </option>
          ))}
        </Form.Select>
      </div>

      <Row className="g-4">
        {filteredProducts.map((product) => (
          <Col key={product.id} xs={12} sm={6} lg={4} xl={3}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>

      {filteredProducts.length === 0 && (
        <p className="text-center text-muted">
          No products found.
        </p>
      )}
    </Container>
  );
}

export default ProductList;
