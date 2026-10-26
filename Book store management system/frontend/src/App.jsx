
import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
  Alert,
  Spinner
} from "react-bootstrap";

import {
  FaBook,
  FaPlus,
  FaEdit,
  FaTrash
} from "react-icons/fa";

import {
  getAllBooks,
  addBook,
  updateBook,
  deleteBook
} from "./AllApi";

import "./App.css";

const emptyBook = {
  title: "",
  author: "",
  price: "",
  category: "",
  description: "",
  availability: true,
  coverImage: ""
};

function App() {
  const [books, setBooks] = useState([]);
  const [bookData, setBookData] = useState({ ...emptyBook });
  const [editId, setEditId] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // GET ALL BOOKS
  const loadBooks = async () => {
    try {
      setError("");

      const data = await getAllBooks();

      setBooks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Get books error:", err.response?.data || err.message);
      setError("Unable to load books. Check your backend server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  // HANDLE INPUT CHANGES
  const handleChange = (e) => {
    const { name, value } = e.target;

    setBookData((previous) => ({
      ...previous,
      [name]:
        name === "availability"
          ? value === "true"
          : value
    }));
  };

  // OPEN ADD FORM
  const handleAdd = () => {
    setBookData({ ...emptyBook });
    setEditId(null);
    setError("");
    setSuccess("");
    setShowForm(true);
  };

  // OPEN EDIT FORM
  const handleEdit = (book) => {
    setBookData({
      title: book.title ?? "",
      author: book.author ?? "",
      price: book.price ?? "",
      category: book.category ?? "",
      description: book.description ?? "",
      availability: book.availability ?? true,
      coverImage: book.coverImage ?? ""
    });

    setEditId(book.id);
    setError("");
    setSuccess("");
    setShowForm(true);
  };

  // ADD OR UPDATE BOOK
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      const submittedBook = {
        ...bookData,
        price: Number(bookData.price)
      };

      if (editId !== null) {
        await updateBook(editId, submittedBook);
        setSuccess("Book updated successfully!");
      } else {
        await addBook(submittedBook);
        setSuccess("Book added successfully!");
      }

      setShowForm(false);
      setEditId(null);
      setBookData({ ...emptyBook });

      await loadBooks();
    } catch (err) {
      console.error("Save book error:", err.response?.data || err.message);
      setError(
        err.response?.data?.message ||
        "Unable to save the book. Please try again."
      );
    }
  };

  // DELETE BOOK
  const handleDelete = async (id) => {
    if (id === undefined || id === null || id === "") {
      setError("Cannot delete this book because its ID is missing.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmed) return;

    setError("");
    setSuccess("");
    setDeletingId(id);

    try {
      // Send DELETE request to JSON Server
      await deleteBook(id);

      // Remove the deleted book from the screen
      setBooks((previousBooks) =>
        previousBooks.filter(
          (book) => String(book.id) !== String(id)
        )
      );

      setSuccess("Book deleted successfully!");
    } catch (err) {
      console.error("Delete error:", {
        id,
        status: err.response?.status,
        response: err.response?.data,
        message: err.message
      });

      setError(
        err.response?.data?.message ||
        `Unable to delete book ID ${id}. Check the backend and Console.`
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <Container className="store-container py-4">
      {/* HEADER */}
      <header className="store-header">
        <FaBook className="store-icon" size={38} />

        <h1>Book Store</h1>

        <p>Your personal collection, beautifully organised.</p>
      </header>

      {/* SUCCESS MESSAGE */}
      {success && (
        <Alert
          variant="success"
          dismissible
          onClose={() => setSuccess("")}
        >
          {success}
        </Alert>
      )}

      {/* ERROR MESSAGE */}
      {error && (
        <Alert
          variant="danger"
          dismissible
          onClose={() => setError("")}
        >
          {error}
        </Alert>
      )}

      {/* BOOK LIST HEADER */}
      <div className="books-toolbar">
        <div>
          <h2>Our Collection</h2>
          <p>{books.length} books in your collection</p>
        </div>

        <Button variant="primary" onClick={handleAdd}>
          <FaPlus className="me-2" />
          Add Book
        </Button>
      </div>

      {/* BOOK LIST */}
      {loading ? (
        <div className="loading-area">
          <Spinner animation="border" />
          <p>Loading your collection...</p>
        </div>
      ) : books.length === 0 ? (
        <div className="empty-state">
          <FaBook size={35} />
          <h3>Your collection is empty</h3>
          <p>Add your first book to get started.</p>

          <Button variant="primary" onClick={handleAdd}>
            <FaPlus className="me-2" />
            Add Your First Book
          </Button>
        </div>
      ) : (
        <Row>
          {books.map((book) => (
            <Col
              key={book.id}
              xs={12}
              sm={6}
              lg={4}
              className="mb-4"
            >
              <Card className="book-card h-100">
                <div className="book-cover-wrapper">
                  {book.coverImage ? (
                    <Card.Img
                      className="book-cover"
                      variant="top"
                      src={book.coverImage}
                      alt={book.title}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="no-cover">
                      <FaBook size={38} />
                      <span>No cover image</span>
                    </div>
                  )}
                </div>

                <Card.Body className="d-flex flex-column">
                  <span className="book-category">
                    {book.category}
                  </span>

                  <Card.Title className="book-title mt-3">
                    {book.title}
                  </Card.Title>

                  <p className="book-author">
                    by {book.author}
                  </p>

                  <p className="book-price">
                    ₹{book.price}
                  </p>

                  <p className="book-description">
                    {book.description}
                  </p>

                  <p>
                    <span
                      className={
                        book.availability
                          ? "status available"
                          : "status unavailable"
                      }
                    >
                      {book.availability
                        ? "● Available"
                        : "● Out of stock"}
                    </span>
                  </p>

                  <div className="book-actions mt-auto">
                    <Button
                      variant="outline-primary"
                      onClick={() => handleEdit(book)}
                    >
                      <FaEdit className="me-1" />
                      Edit
                    </Button>

                    <Button
                      variant="outline-danger"
                      disabled={deletingId !== null}
                      onClick={() => handleDelete(book.id)}
                    >
                      <FaTrash className="me-1" />

                      {String(deletingId) === String(book.id)
                        ? "Deleting..."
                        : "Delete"}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* ADD / EDIT MODAL */}
      <Modal
        show={showForm}
        onHide={() => setShowForm(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {editId !== null ? "Edit Book" : "Add New Book"}
          </Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Book Title</Form.Label>
              <Form.Control
                name="title"
                value={bookData.title}
                onChange={handleChange}
                placeholder="Enter book title"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                name="author"
                value={bookData.author}
                onChange={handleChange}
                placeholder="Enter author name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price (₹)</Form.Label>
              <Form.Control
                type="number"
                name="price"
                min="0"
                step="0.01"
                value={bookData.price}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                name="category"
                value={bookData.category}
                onChange={handleChange}
                placeholder="Enter category"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={bookData.description}
                onChange={handleChange}
                placeholder="Enter description"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Cover Image URL</Form.Label>
              <Form.Control
                type="url"
                name="coverImage"
                value={bookData.coverImage}
                onChange={handleChange}
                placeholder="https://example.com/book.jpg"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Availability</Form.Label>
              <Form.Select
                name="availability"
                value={String(bookData.availability)}
                onChange={handleChange}
              >
                <option value="true">Available</option>
                <option value="false">Out of stock</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </Button>

            <Button type="submit" variant="primary">
              {editId !== null ? "Update Book" : "Save Book"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}

export default App;
