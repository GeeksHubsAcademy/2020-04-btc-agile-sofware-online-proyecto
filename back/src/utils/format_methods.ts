import { LeanDocument } from "mongoose";
import { IBook } from "../models/book.model";
import { FormattedBook } from "../types";

export function formatBook(book: IBook) {
  const fmt = book.toJSON();

  delete fmt.__v;
  delete fmt.created_at;
  delete fmt.updated_at;

  return fmt;
}
