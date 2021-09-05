import Book, { IBook } from "../models/book.model";
import { formatBook } from "../utils/format_methods";
import { validateFields } from "../utils/check_fields";

export const listBooks = async (req, res) => {
  try {
    const books: Array<IBook> = await Book.find();
    res.status(200).json(books.map(formatBook));
  } catch (error) {
    res.status(500).json({ message: "Something was wrong" });
  }
};

export const addBook = async (req, res) => {
  const newBook: IBook = req.body;

  if (!validateFields(newBook)) {
    res.status(422).json({ message: "Title and author are required" });
  } else {
    const bookAdded = await Book.create(newBook);

    if (bookAdded) {
      const bookAddedFormatted = formatBook(bookAdded);

      res.status(201).json(bookAddedFormatted);
    }
  }
};

export const getBook = async (req, res) => {
  try {
    const book: IBook = await Book.findById(req.params.id);

    const bookFormatted = formatBook(book);

    res.status(200).json(bookFormatted);
  } catch (error) {
    res.status(404).json({ message: "Book not found" });
  }
};

export const updateBook = async (req, res) => {
  try {
    const bookId: string = req.params.id;

    const update = req.body;

    const updatedBook: IBook = await Book.findByIdAndUpdate(bookId, update, {
      new: true,
    });
    if (updatedBook) {
      res.status(200).json(updatedBook);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something was wrong" });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const bookId: string = req.params.id;

    const removedBook: IBook = await Book.findByIdAndRemove(bookId);

    if (removedBook) {
      res.status(200).json(removedBook);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something was wrong" });
  }
};
