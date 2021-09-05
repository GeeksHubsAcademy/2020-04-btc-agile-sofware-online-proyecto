import { Router } from "express";
import {
  addBook,
  listBooks,
  getBook,
  updateBook,
  deleteBook,
} from "../controllers/books.controller";

const bookRoutes = Router();

bookRoutes.get("/", listBooks);
bookRoutes.post("/", addBook);
bookRoutes.get("/:id", getBook);
bookRoutes.patch("/:id", updateBook);
bookRoutes.delete("/:id", deleteBook);

export default bookRoutes;
