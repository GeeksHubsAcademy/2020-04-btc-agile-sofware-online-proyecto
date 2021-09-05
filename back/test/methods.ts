import { MongoMemoryServer as MMS } from "mongodb-memory-server";
import mongoose from "mongoose";
import fs from "fs";
import Book from "../src/models/book.model";

const mongoServer = async () => {
  return MMS.create({ instance: { dbName: "mocked_ddbb" } });
};

export const connectdbMemory = async () => {
  const foo = await mongoServer();
  const uri = foo.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    dbName: "mocked_ddbb",
    useCreateIndex: true,
    useUnifiedTopology: true,
  };

  await mongoose.connect(uri, mongooseOpts);
};

export const disconnectdbMemory = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  const foo = await mongoServer();
  await foo.stop();
};

// LOADING DATA IN MEMORY

export const loadBooks = async () => {
  let rawData = fs.readFileSync("./test/data/books.json");
  let books = JSON.parse(rawData.toString());
  console.log(books);

  for await (const book of Object.values(books)) {
    const newBook = new Book(book);

    newBook.save();
  }

  return books;
};
