
import { commonapi } from "./CommonApi";
import { ServerUrl } from "./ServerUrl";

// GET: Get all books
export const getAllBooks = async () => {
  return await commonapi("GET", `${ServerUrl}/books`);
};

// GET: Get one book by ID
export const getBookById = async (id) => {
  return await commonapi("GET", `${ServerUrl}/books/${id}`);
};

// POST: Add a new book
export const addBook = async (bookData) => {
  return await commonapi("POST", `${ServerUrl}/books`, bookData);
};

// PUT: Update a book
export const updateBook = async (id, bookData) => {
  return await commonapi("PUT", `${ServerUrl}/books/${id}`, bookData);
};

// DELETE: Delete a book
export const deleteBook = async (id) => {
  return await commonapi("DELETE", `${ServerUrl}/books/${id}`);
};
