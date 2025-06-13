require("dotenv").config();
// const dotenv = require('dotenv')
// dotenv.config()
const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/connectDB");
const postsRouter = require("./router/Post/postsRouter");
// call the db
connectDB();
const app = express();

//* Middlewares
app.use(express.json()); //parse json data

//* cors middleware
const corsOption = {
    origin: [process.env.WEBSITE],
    Credential: true,
};
app.use(cors(corsOption));

//! ---------route handlers-------
app.use("/api/v1", postsRouter);

//! Not found
app.use((req, res, next) => { // eslint-disable-line no-unused-vars
    res.status(404).json({ message: "Route not found on our server" });
});

//! Error handling middleware
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    // prepare the error messages
    const { message, stack } = err;
    res.status(500).json({
        message,
        stack,
    });
});

//! PORT
const PORT = process.env.PORT || 5000;
//! Start the server....
app.listen(PORT, console.log(`Server is up and running on port ${PORT}`));
