import { IBook } from "../models/book.model";

export function validateFields(book: any): boolean {
  if (!book.title || !book.author) {
    return false;
  }
  return true;
}
