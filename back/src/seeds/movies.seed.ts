import connectdb from "../../config/configdb.js";
import Book, { IBook } from "../models/book.model.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import fs from "fs";

dotenv.config();

const urldb: string = process.env.DB_URL;
const portdb: string = process.env.DB_PORT;
let namedb: string = process.env.DB_NAME;

if (process.env.NODE_ENV === "development") {
  connectdb(urldb, portdb, namedb);
} else {
  // We hardcode this parameters in order to avoid CI errors  (.env is not available)
  connectdb("localhost", "27017", "library_test");
}

mongoose.connection.dropCollection("books", () => {
  console.log("*** books collection deleted ***");
});

// Adding books to database
const addBooks = async (): Promise<void> => {
  let rawData = fs.readFileSync("./test/data/books.json");
  let books = JSON.parse(rawData.toString());

  for await (let book of Object.values(books)) {
    Book.create(book);
  }

  console.log("*** books created ***");
};

addBooks();

setTimeout(() => {
  mongoose.disconnect();
}, 3000);
