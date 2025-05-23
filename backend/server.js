require("dotenv").config();
// const dotenv = require('dotenv')
// dotenv.config()
const express = require("express");
const Post = require("./models/Post/Post");
const cors = require("cors");
const asyncHandler = require("express-async-handler");
const connectDB = require("./utils/connectDB");
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

//! Create post
app.post(
    "/api/v1/posts/create",
    asyncHandler(async (req, res) => {
        //* get the payload
        const { title, description } = req.body;

        // find the post by title
        const postFound = await Post.findOne({ title });
        if (postFound) {
            throw new Error("Post already exists");
        }
        console.log(req.body);
        const postCreated = await Post.create({ title, description });
        res.json({
            status: "success",
            message: "Post created successfully",
            postCreated,
        });
    })
);
//! List posts
app.get(
    "/api/v1/posts",
    asyncHandler(async (req, res) => {
        const posts = await Post.find();
        res.json({
            status: "success",
            message: "Post fetched successfully",
            posts,
        });
    })
);
//! Update post
app.put(
    "/api/v1/posts/:postId",
    asyncHandler(async (req, res) => {
        // get the post id from params
        const postId = req.params.postId;
        // find the post
        const postFound = await Post.findById(postId);
        if (!postFound) {
            throw new Error("Post not found");
        }
        // update
        const postUpdated = await Post.findByIdAndUpdate(
            postId,
            { title: req.body.title, description: req.body.description },
            {
                new: true,
            }
        );
        res.json({
            status: "Post updated successfully",
            postUpdated,
        });
    })
);
//! Get post
app.get(
    "/api/v1/posts/:postId",
    asyncHandler(async (req, res) => {
        // get the post id from params
        const postId = req.params.postId;
        // find the post
        const postFound = await Post.findById(postId);
        res.json({
            status: "success",
            message: "Post fetched successfully",
            postFound,
        });
    })
);
//! Delete post
app.delete(
    "/api/v1/posts/:postId",
    asyncHandler(async (req, res) => {
        // get the post id from params
        const postId = req.params.postId;
        // find the post and delete it
        await Post.findByIdAndDelete(postId);
        res.json({
            status: "success",
            message: "Post deleted successfully",
        });
    })
);

//! Not found
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found on our server" });
});

//! Error handling middleware
app.use((err, req, res, next) => {
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
