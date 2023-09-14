// Import Mongoose.
const mongoose = require("mongoose");


// A schema is the organisation or structure of a database. Therefore the function below is to create the structure of the database we are accessing ie My Book Database.
// For schemas, there are several ways you can go about it. Look at Mongoose.com to see how you should structure your schemas and what types there are and what to use them for.
// In this case eg, what the title schema is showing is that title is of a string type it is required and it is unique to a specific book meaning no two books in the database will share the exact same title.
const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true,
    },
    author:{
        type: String,
        required: true,
        unique: false,
    },
    genre:{
        type: String,
        required: false,
        unique: false,
    },
    ISBN:{
        type: Number,
        required: false,
        unique: true,
    }
});

// These two lines of code allow you to be able to export the book schema model via the Book function.
// book is the name of the model
const Book = mongoose.model("book",bookSchema)

// module is the key word used to export a function. ALWAYS REMEMBER TO USE EXPORTS with an 'S' at the end when exporting a function!!
module.exports = Book;