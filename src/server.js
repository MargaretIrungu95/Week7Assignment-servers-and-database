// This is where this function belongs. Visit ./database/connection.js to see its use. Always go first on the server.js
require("dotenv").config();

// get database connection.
require("./database/connection");

// this is a node library you have to 'npm install' before use. express helps initiate the commands given in this file eg. express can be used to fetch or get other files that need to be used within the function or the file in general.
const express = require("express");
// run npm install cors to be able to use it here
const cors = require("cors");
// This PORT variable has to be in the .env file as well as it is defined there and has to always be in capital letters (the variables not functions).
const port = process.env.PORT;

// Imports the function that has the book model schema  -might not be needed
// const Book = require ("./models/bookmodel");

// import book router
const bookRouter = require("./routes/routes");
// rename express to app - standard industry requiremnt
const app = express();

// adding middleware
// these two lines will always be run when a requst come in
app.use(cors());
app.use(express.json());

// sets up router which will call each individual routes
app.use(bookRouter);

// industry standard to always make sure you have a health route that lets you know that the API is working. 
// It is im[portant to have this as one of the first things on your page so you can use Thunder client whenever an error occurs to confirm if your server is still working or the crash is from within.
app.use("/health", (req,res) => {
    res.status(200).json({message: "API is alive!"});
})

// creates a listener for the port
app.listen(port, () => console.log(`Server is listening on ${port}`));

