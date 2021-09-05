import mongoose from "mongoose";

export interface IBook extends mongoose.Document {
  title: string;
  author: string;
  year: number;
  cover_path: string;
  created_at: string;
  updated_at: string;
}

const bookSchema = new mongoose.Schema(
  {
    title: { type: String },
    author: { type: String },
    year: { type: Number },
    cover_path: { type: String },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export default mongoose.model<IBook>("Book", bookSchema);
