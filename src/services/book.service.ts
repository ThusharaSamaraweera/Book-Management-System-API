import { Schema } from "mongoose";
import { BookModelSchema } from "../data/MongoDb";
import {  NewBook } from "../modules";
import { ServerError } from "../utils/errorHandling/ErrorResponse";

/**
 * 
 * @param book 
 * @param userId 
 */
const create = async (book: NewBook, userId: Schema.Types.ObjectId) => {
    try {
        const bookModel = new BookModelSchema(book);
        bookModel.createdBy = userId;
    } catch (error) {
        throw new ServerError("Book creation failed", error.message)
        
    }   
}

export const bookService = {
    create
}   