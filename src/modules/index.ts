import { Schema } from "mongoose";

export interface IUser {
    name: string;
    email: string;
    password: string;
}

export type LoginUser = Pick<IUser, "email" | "password">;

export interface jwtPayload {
  id: string;
  email: string;
  iat?: number;
  exp?: number;
}

export interface IBook {
  title: string;
  author: string;
  publicationYear: string;
  genre: string;
  createdBy: Schema.Types.ObjectId;
}

export type NewBook = Omit<IBook, "createdBy">;

export interface BookFilterQuery {
  title?: RegExp;
  author?: RegExp;
  genre?: string;
}