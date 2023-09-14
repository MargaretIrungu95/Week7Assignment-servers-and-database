// The controllers are used to control what the routes you have created will do. They help you manipulated the database according to the request sent by user.
// The verbs used to create these commands are from the express library that helps to write handlers for requests with various HTTP verbs such as get post etc for different routes and at specific points of said routes.
// HyperText Transfer Protocol (HTTP) is a method that requires a strong connection (eg. routes) to exchange data between a client and a server(database server in this case).
// Import book model schema.
const Book = require("../models/bookmodel");


// adding a book to the database.
// req is request and res is response
async function addaBook(req, res) {
    console.log("The requested body is:",req.body);
    try {
        // func to handle successful response which means book is added
        const newBook = await Book.create({
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            ISBN: req.body.ISBN
        })
        // success response message
        const successResponse = {
            message: "Book has been added",
            // This displays the new book following structure in newBook function.
            newBook: newBook
        }
        // these are known as call back functions. They operate once a HTTP request eg post etc is received. Must have one whenever you use routes.
        res.status(201).json(successResponse);
    } catch (error) {
        //function to handle error response 
        const errorResponse = {
            message : "Error Occured",
            // will display the error
            error : error
        };
        // error code that will be displayed if error occurs. You can look up what response code numbers do what.
        res.status(501).json(errorResponse); 
    }
};

// Listing all books
const listAllBooks = async(req,res) => {
    try {
        // empty curly brackets after find means you want to get all the books listed. if you want to specify you can use json in the brackets to specify.
        const listOfBooks = await Book.find({});

        const successResponse = {
            message: "Success",
            // display function that lists the books in db
            books: listOfBooks
        };
        // success status code is always 200
        res.status(200).json(successResponse);
    } catch (error) {
        // exactly same as add books
        console.log(error);
        const errorResponse = {
            message: "Error Occurred",
            error: error
        };
        res.status(501).json(errorResponse);    }
};

// Listing a book by its title
// Same as anything that requests any item in the database by the parameter of title except this HTTP verb (get) will list all the details of the book requested by its title.
const listBookByTitle = async (req, res) => {
    try {
      const filter = { title: req.body.title };
      const book = await Book.findOne(filter);
        // Please note that this error is for if the book that is being requested for is not found not if the route does not wortk. The catch section handles the error in the case that the route encounters issue whilst responding to the HTTP request.
        // if not found;
        if (!book) {
        const noBookResponse = {
          success: false,
          message: "Book not found",
          title: req.body.title,
        };
        res.status(404).json(noBookResponse);
        // if successful;
      } else {
        const successResponse = {
          message: "Book found",
          book: book,
        };
        res.status(200).json(successResponse);
      }
    //   Same error handling as other routes.
    } catch (error) {
      console.log(error);
      const errorResponse = {
        message: "Error Occurred",
        error: error,
      };
      res.status(501).json(errorResponse);
    }
};

// Updating a book by ID
const updateaBookById = async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
    //   if book is not found in database
      if (!book) {
        const noBookResponse = {
          success: false,
          message: "Book not found",
          id: req.params.id,
        };
        // show the 'not found' message (error 404). 
        res.status(404).json(noBookResponse);
        
        // every item stored onto a database has a unique id, in this case, the id is a number that is an object id. This is what we will use request parameter (req.params.id) to get the book by its unique id and then update it accordingly.
        // if the book is found successfully, the update the book and diplay the message and log the success message with the updated book  
      } else {
        const updateBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
        });
        // after logging the new change successflully, display message and update the info in the book specific to the params.id that was requested and changed
        const successResponse = {
          message: "Book updated succesfully",
          book: updateBook,
        };
        res.status(200).json(successResponse);
      }
    //   exactly same as the others for the catch error section
    } catch (error) {
      console.log(error);
      const errorResponse = {
        message: "Error Occurred",
        error: error,
      };
      res.status(501).json(errorResponse);
    }
};

// updating an author by title
const updateanAuthorByTitle = async (req, res) => {
    // as you want to update a particular book to update the author details, its better to find the book using the title which is the filter function here, uing the findOne request.
    try {
      const filter = { title: req.body.title };
      const book = await Book.findOne(filter);
        // if not found successfully:
      if (!book) {
        const noBookResponse = {
          success: false,
          message: "Book not found",
          title: req.body.title,
        };
        res.status(404).json(noBookResponse);
        // if found successfully, using update func as the author and filter as title, find it, update it and log a successful callback status and message along with the updated book.
      } else {
        const update = { author: req.body.author };
        const newAuthor = await Book.findOneAndUpdate(filter, update, {
          new: true,
        });
        const successResponse = {
          message: "Author updated succesfully",
          book: newAuthor,
        };
        res.status(200).json(successResponse);
      }
    //   Same error handling as other routes
    } catch (error) {
      console.log(error);
      const errorResponse = {
        message: "Error Occurred",
        error: error,
      };
      res.status(501).json(errorResponse);
    }
};

// updating a book by its title
// similar methods with anything identified by title except with this one its an update on the specific book details
const updateaBookByTitle = async (req, res) => {
    try {
      const filter = { title: req.body.title };
      const book = await Book.findOne(filter);
  
      if (!book) {
        const noBookResponse = {
          success: false,
          message: "Book not found",
          title: req.body.title,
        };
        res.status(404).json(noBookResponse);
      } else {
        const update = req.body;
        // find the title in this case, update it and then log that an update has been made successfully and add the updated book to the database (func update is the body of the database)
        const newBook = await Book.findOneAndUpdate(filter, update, {
          new: true,
        });
        const successResponse = {
          message: "Book updated succesfully",
          book: newBook,
        };
        res.status(200).json(successResponse);
      }
    //   same error handling as other routes
    } catch (error) {
      console.log(error);
      const errorResponse = {
        message: "Error Occurred",
        error: error,
      };
      res.status(501).json(errorResponse);
    }
};

// deleting a book by its id.
//  similar method as anything with /:id but manipulated to delete just one book by its identifier
const deleteaBookById = async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
  
      if (!book) {
        const noBookResponse = {
          success: false,
          message: "Book not found",
          id: req.params.id,
        };
        res.status(204).json(noBookResponse);
      } else {
        const deleteBook = await Book.findByIdAndDelete(req.params.id);
  
        const successResponse = {
          message: "Book deleted successfully",
          book: deleteBook,
        };
        res.status(200).json(successResponse);
      }
    //   Same error handling as other routes
    } catch (error) {
      console.log(error);
      const errorResponse = {
        message: "Error Occurred",
        error: error,
      };
      res.status(501).json(errorResponse);
    }
};
 
// Deleting a book by its title
const deleteaBookByTitle = async (req, res) => {

    try {
        // create a filter function (can be called anything you prefer as long as it makes sense), which will request the title of the book
        // find book by its title
      const filter = { title: req.body.title };
      const book = await Book.findOne(filter);
        // if book is not found, display the message and the title of the book not being found
      if (!book) {
        const noBookResponse = {
          success: false,
          message: "Book not found",
          title: req.body.title,
        };
        // log the 404 not found callback response
        res.status(404).json(noBookResponse);
      } else {
        // if found, find the book by its filter (title) and delete it and display success message.
        const newBook = await Book.findOneAndDelete(filter);
        const successResponse = {
          message: "Book deleted succesfully",
          book: newBook,
        };
        // callback to show successful response
        res.status(200).json(successResponse);
      }
    //   same error handling as other routes
    } catch (error) {
      console.log(error);
      const errorResponse = {
        message: "Error Occurred",
        error: error,
      };
      res.status(501).json(errorResponse);
    }
};
    
// Deleting a book by its title
const deleteAllBooks = async (req, res) => {
    try {
        // find Book, go to collection on MongoDB and find every book with the version as 0 (which is all) and the deleteMany request will delete all the books logged onto version 0.
        // if a success, the message will be displayed and the books deleted. 
      const filter = {"__v": 0};
      const newBook = await Book.collection.deleteMany(filter);
      const successResponse = {
        message: "All books deleted succesfully",
        books: newBook
      };
      res.status(200).json(successResponse);
    //   same error handling as all the other routes.
    } catch (error) {
      console.log(error);
      const errorResponse = {
        message: "Error Occurred",
        error: error
      };
      res.status(501).json(errorResponse);
    }
};
  
// these methods can be used to update or delete any part of the books database including the genre with slight adjstments.

// export functions
module.exports = {
    addaBook,
    listAllBooks,
    listBookByTitle,
    updateaBookById,
    updateanAuthorByTitle,
    updateaBookByTitle,
    deleteaBookByTitle,
    deleteaBookById,
    deleteAllBooks,
};
