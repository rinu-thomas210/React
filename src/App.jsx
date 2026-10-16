
import { useState, useEffect, useRef } from "react";
import { Link, Routes, Route } from "react-router-dom";
import ProductCard from "./product";
import "./App.css";

// Product data
const products = [
  { id: 1, name: "Laptop", price: 50000, category: "Electronics" },
  { id: 2, name: "Headphones", price: 2000, category: "Accessories" },
  { id: 3, name: "Keyboard", price: 1500, category: "Accessories" },
  { id: 4, name: "Mouse", price: 1000, category: "Accessories" },
];

function App() {
  // Lifted state: shared by two child components
  const [message, setMessage] = useState("Hello!");

  return (
    <div className="app-container">
      <nav className="navbar navbar-expand navbar-dark bg-dark px-4">
        <Link className="navbar-brand" to="/">
          My React App
        </Link>

        <div className="navbar-nav">
          <Link className="nav-link" to="/">
            Home
          </Link>

          <Link className="nav-link" to="/about">
            About
          </Link>
        </div>
      </nav>

      <main className="container py-4">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                message={message}
                setMessage={setMessage}
              />
            }
          />

          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  );
}

// Home page
function Home({ message, setMessage }) {
  return (
    <>
      <h1 className="mb-2">Our Products</h1>
      <p className="text-secondary">
        Explore our latest products and React features.
      </p>

      {/* Product cards */}
      <section className="product-grid mb-5">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            category={product.category}
          />
        ))}
      </section>

      <hr />

      {/* Requirement 1 and 2: useState, onClick, useEffect */}
      <section className="feature-section">
        <h2>1. Counter</h2>
        <Counter />
      </section>

      <hr />

      {/* Requirement 4: onChange and onSubmit */}
      <section className="feature-section">
        <h2>2. Contact Form</h2>
        <ContactForm />
      </section>

      <hr />

      {/* Requirement 5: useRef */}
      <section className="feature-section">
        <h2>3. Focus Input</h2>
        <FocusInput />
      </section>

      <hr />

      {/* Requirement 6: lifted state and two children */}
      <section className="feature-section">
        <h2>4. Shared Message</h2>

        <MessageInputChild
          onChangeMessage={setMessage}
        />

        <MessageDisplayChild message={message} />
      </section>
    </>
  );
}

// Counter component
function Counter() {
  const [count, setCount] = useState(0);

  // Update browser tab title when count changes
  useEffect(() => {
    document.title = `Counter: ${count}`;
  }, [count]);

  return (
    <div>
      <h3>Count: {count}</h3>

      <button
        className="btn btn-primary me-2"
        onClick={() => setCount(count + 1)}
      >
        Increase
      </button>

      <button
        className="btn btn-danger me-2"
        onClick={() => setCount(count - 1)}
      >
        Decrease
      </button>

      <button
        className="btn btn-secondary"
        onClick={() => setCount(0)}
      >
        Reset
      </button>
    </div>
  );
}

// Form component
function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submittedName, setSubmittedName] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setSubmittedName(name);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-box">
        <div className="mb-3">
          <label className="form-label">Name</label>

          <input
            type="text"
            className="form-control"
            placeholder="Enter your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>

          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>

      {submittedName && (
        <p className="alert alert-success mt-3">
          Form submitted successfully! Hello, {submittedName}.
        </p>
      )}
    </div>
  );
}

// useRef component
function FocusInput() {
  const inputRef = useRef(null);

  function handleFocus() {
    inputRef.current.focus();
  }

  return (
    <div className="form-box">
      <input
        ref={inputRef}
        type="text"
        className="form-control mb-3"
        placeholder="Click the button to focus here"
      />

      <button
        className="btn btn-warning"
        onClick={handleFocus}
      >
        Focus Input
      </button>
    </div>
  );
}

// Child 1: updates the parent's message
function MessageInputChild({ onChangeMessage }) {
  const [newMessage, setNewMessage] = useState("");

  return (
    <div className="form-box">
      <label className="form-label">Enter a message</label>

      <input
        type="text"
        className="form-control mb-3"
        value={newMessage}
        onChange={(event) => setNewMessage(event.target.value)}
        placeholder="Type a message"
      />

      <button
        className="btn btn-primary"
        onClick={() => onChangeMessage(newMessage)}
      >
        Update Message
      </button>
    </div>
  );
}

// Child 2: displays the parent's message
function MessageDisplayChild({ message }) {
  return (
    <div className="alert alert-info mt-3">
      <strong>Message:</strong> {message}
    </div>
  );
}

// About page
function About() {
  return (
    <section>
      <h1>About Us</h1>
      <p>
        This React application demonstrates useState, useEffect,
        React Router, forms, useRef, and sharing state between components.
      </p>
    </section>
  );
}

export default App;
