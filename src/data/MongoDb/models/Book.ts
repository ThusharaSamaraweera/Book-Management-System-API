import mongoose, { Schema } from "mongoose";
import { IBook } from "../../../modules";

const BookSchema: Schema<IBook> = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publicationYear: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }
  },
  {
    timestamps: true,
  }
);

export const BookModelSchema = mongoose.model("book", BookSchema);