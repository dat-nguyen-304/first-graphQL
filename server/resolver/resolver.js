import { books, authors } from "../data/static";
import Author from "../models/Author";
import Book from "../models/Book";
export const resolvers = {
    //Query
    Query: {
        books: (_parent, _args, context) => {
            return context.mongoDataMethods.getAllBooks();
        },
        book: (_parent, args, context) => {
            return context.mongoDataMethods.getBookById(args.id);
        },
        authors: (_parent, _args, context) => {
            return context.mongoDataMethods.getAllAuthors();
        },
        author: (_parent, args, context) => {
            return context.mongoDataMethods.getAuthorById(args.id);
        }
    },
    Book: {
        author: async (parent, _args, context) => {
            return await context.mongoDataMethods.getAuthorById(parent.authorId);
        }
    },
    Author: {
        books: async (parent, _args, context) => {
            return await context.mongoDataMethods.getAllBooks({ authorId: parent.id });
        }
    },

    //Mutation
    Mutation: {
        createAuthor: async (_parent, args, context) => {
            return context.mongoDataMethods.createAuthor(args);
        },
        createBook: async (_parent, args, context) => {
            return context.mongoDataMethods.createBook(args);
        }
    }
};