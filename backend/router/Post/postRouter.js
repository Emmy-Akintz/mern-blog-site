const express = require("express");
const asyncHandler = require("express-async-handler");
const Post = require("../../models/Post/Post");

//! create instance of express router
const postRouter = express.Router();

// ----------create post-----------------
postRouter.post(
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

// ----------list all posts-----------------
postRouter.get(
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

// ----------update post-----------------
postRouter.put(
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

// ------------Get post-------------
postRouter.get(
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

// ----------Delete post---------------
postRouter.delete(
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

module.exports = postRouter;
