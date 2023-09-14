// Insert express method called router to help simplify the process of sending requests and reseiving responses
// you can use the require method or the import method...same outcome.
const {Router} = require("express");
// assign router a sensible name
const bookRouter = Router();
// import book model schema export function.
const Book = require("../models/bookmodel");

// write some controllers for your routes that will be used to manipulate the data in the database. All routes will be programmed and adjusted within the controller.js file
const {
    addaBook,
    listAllBooks,
    updateaBookByTitle,
    deleteaBookByTitle,
    deleteaBookById,
    updateaBookById,
    updateanAuthorByTitle,
    listBookByTitle,
    deleteAllBooks,
} = require("../controllers/controllers");

// declaring the routes
// commands to use for : adding = post , displaying = get, updating = put, deleting = delete
bookRouter.post("/books/addaBook", addaBook);
bookRouter.get("/books/listAllBooks", listAllBooks);
bookRouter.delete("/books/deleteAllBooks", deleteAllBooks);

// locate the book by id your declare the routes same as the other routes but add (/:id) at the end of the route in speechmarks. This allows you to manipulate data by their id
bookRouter.put("/books/updateaBookById/:id", updateaBookById);
bookRouter.delete("/books/deleteaBookById/:id", deleteaBookById);
// Locating book by title before subjecting said book to any changes
bookRouter.put("/books/updateanAuthorByTitle", updateanAuthorByTitle);
bookRouter.put("/books/updateaBookByTitle", updateaBookByTitle);
bookRouter.delete("/books/deleteaBookByTitle", deleteaBookByTitle);
bookRouter.get("/books/listBookByTitle", listBookByTitle);

// export function with these routes.
module.exports = bookRouter;


