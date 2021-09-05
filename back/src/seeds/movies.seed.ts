import connectdb from "../../config/configdb.js";
import Book, { IBook } from "../models/book.model.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import fs from "fs";

dotenv.config();

const urldb: string = process.env.DB_URL;
const portdb: string = process.env.DB_PORT;
let namedb: string;

if (process.env.NODE_ENV === "development") {
  namedb = process.env.DB_NAME;
} else {
  namedb = process.env.DB_NAME_TEST;
}

console.log(urldb, portdb, namedb);

connectdb(urldb, portdb, namedb);

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
