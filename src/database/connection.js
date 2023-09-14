// Import mongoose from the dependencies downloaded: Mongoose
const mongoose = require ("mongoose");

// you can use a straight up (.require) to test whether this function connects to the database which is in the .env file.
// .config belongs to .env and its function here is to import .env and run it. This allows (process.env.MONGO_URI) to be available to this function.
// this line of code is only here for testing and should be deleted or commented out after you finish testing.
// require("dotenv").config();


// This function establishes a connection to the book database.
async function connection() {
    // use try/catch method to handle the errors after you await for the database to be connected to using the MONGO_URI (situated in .env).
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Successfully connected to the database!");
    } catch (error) {
       console.log(error); 
    }
};

// This allows you to test whether the function is handling the errors by displaying the respective message as coded above onto the terminal.
connection();
