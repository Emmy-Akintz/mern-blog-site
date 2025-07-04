const asyncHandler = require("express-async-handler");
const Post = require("../../models/Post/Post");

const postController = {
    //! create post
    createPost: asyncHandler(async (req, res) => {
        console.log(req.file);
        //* get the payload
        const { description } = req.body;
        const postCreated = await Post.create({ description });
        res.json({
            status: "success",
            message: "Post created successfully",
            postCreated,
        });
    }),

    //! list all posts
    fetchAllPosts: asyncHandler(async (req, res) => {
        const posts = await Post.find();
        res.json({
            status: "success",
            message: "Post fetched successfully",
            posts,
        });
    }),

    //! get a post
    getPost: asyncHandler(async (req, res) => {
        // get the post id from params
        const postId = req.params.postId;
        // find the post
        const postFound = await Post.findById(postId);
        res.json({
            status: "success",
            message: "Post fetched successfully",
            postFound,
        });
    }),

    //! delete post
    delete: asyncHandler(async (req, res) => {
        // get the post id from params
        const postId = req.params.postId;
        // find the post and delete it
        await Post.findByIdAndDelete(postId);
        res.json({
            status: "success",
            message: "Post deleted successfully",
        });
    }),

    //! update post
    update: asyncHandler(async (req, res) => {
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
    }),
}

module.exports = postController;