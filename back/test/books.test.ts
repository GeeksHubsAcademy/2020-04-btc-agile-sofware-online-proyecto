import mongoose from "mongoose";
import request from "supertest";
import app from "../src/app";
import Book, { IBook } from "../src/models/book.model";
import connectdb from "../config/configdb";

let books: IBook[];

const getBooks = async () => {
  return Book.find();
};

beforeAll(async () => {
  // Obtener de .env
  connectdb("localhost", "27017", "library_test");

  books = await getBooks();
  return books;
});

test("should pass", () => {
  expect(true).toEqual(true);
});

describe("GET /book", () => {
  test("should list all books", async () => {
    await request(app)
      .get("/book")
      .expect(200)
      .expect((res) => {
        const body = res.body;
        expect(body).toHaveLength(books.length);
      });
  });
});

describe("POST /book", () => {
  test("should add a new book", async () => {
    const body = {
      title: "Las guerras yugoslavas",
      author: "Eladi Romero García",
      year: 2021,
      cover_path: "cover_path",
    };

    await request(app)
      .post("/book")
      .send(body)
      .expect(201)
      .expect((res) => {
        const body = res.body;
        expect(body).toHaveProperty("_id");
        expect(body).toHaveProperty("title");
        expect(body).toHaveProperty("author");
        expect(body).toHaveProperty("year");
        expect(body).toHaveProperty("cover_path");
        expect(body).not.toHaveProperty("__v");
        expect(body).not.toHaveProperty("created_at");
        expect(body).not.toHaveProperty("updated_at");
      });
  });
  test("should refuse to add a new book", async () => {
    const body = {
      title: "Las guerras yugoslavas",
      year: 2021,
      cover_path: "cover_path",
    };

    const msg = "Title and author are required";

    await request(app)
      .post("/book")
      .send(body)
      .expect(422)
      .expect((res) => {
        const body = res.body;
        expect(body.message).toEqual(msg);
      });
  });
});

describe("GET /book/:id", () => {
  test("should return a single book", async () => {
    await request(app)
      .get(`/book/${books[0]._id}`)
      .expect(200)
      .expect((res) => {
        const body = res.body;
        expect(body);
      });
  });
  test("should return a 404 book not found", async () => {
    const fakeBookId = "999999999999999999999999";

    const msg = "Book not found";

    await request(app)
      .get(`/book/${fakeBookId}`)
      .expect(404)
      .expect((res) => {
        const body = res.body;
        expect(body.message).toEqual(msg);
      });
  });
});

describe("PATCH /book/:id", () => {
  test("should update a book", async () => {
    const id: string = books[0]._id;
    const update = {
      title: "new title",
    };

    await request(app)
      .patch(`/book/${id}`)
      .send(update)
      .expect(200)
      .expect((res) => {
        const body = res.body;
        expect(body.title).toEqual(update.title);
      });
  });
  test("should return a 404 book not found", async () => {
    const fakeBookId = "999999999999999999999999";

    const update = {
      title: "new title",
    };

    const msg = "Book not found";

    await request(app)
      .patch(`/book/${fakeBookId}`)
      .send(update)
      .expect(404)
      .expect((res) => {
        const body = res.body;
        expect(body.message).toEqual(msg);
      });
  });
});

describe("DELETE /book/:id", () => {
  test("should remove a book", async () => {
    const id: string = String(books[0]._id);

    await request(app)
      .delete(`/book/${id}`)
      .expect(200)
      .expect((res) => {
        const body = res.body;
        expect(body._id).toEqual(id);
      });
  });
  test("should return a 404 book not found", async () => {
    const fakeBookId = "999999999999999999999999";

    const msg = "Book not found";

    await request(app)
      .delete(`/book/${fakeBookId}`)
      .expect(404)
      .expect((res) => {
        const body = res.body;
        expect(body.message).toEqual(msg);
      });
  });
});

// This avoid final errors of unhandled promises
afterAll(() => {
  return mongoose.disconnect();
});
