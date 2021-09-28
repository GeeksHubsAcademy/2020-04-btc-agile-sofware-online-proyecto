import express from "express";
import dotenv from "dotenv"; // Why this? Everything is working....
import connectdb from "../config/configdb";
import cors from "cors";

import bookRoutes from "./routes/books.routes";

const app = express();

dotenv.config({ path: ".env" });

const urldb: string = process.env.DB_URL;
const portdb: string = process.env.DB_PORT;
let namedb: string;

if (process.env.NODE_ENV === "development") {
  namedb = process.env.DB_NAME;
  connectdb(urldb, portdb, namedb);
}

if (process.env.NODE_ENV === "seed") {
  namedb = process.env.DB_NAME_TEST;
  connectdb(urldb, portdb, namedb);
}

if (process.env.NODE_ENV === "fronttest") {
  namedb = process.env.DB_NAME_TEST;
  connectdb(urldb, portdb, namedb);
}

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/book", bookRoutes);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
  });
}

export default app;
