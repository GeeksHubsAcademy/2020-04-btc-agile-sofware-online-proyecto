import { IBook } from "../models/book.model";

export function validateFields(book: any): boolean {
  let validBook: boolean;

  if (!book.title || !book.author) {
    validBook = false;
  } else {
    validBook = true;
  }

  return validBook;
}
