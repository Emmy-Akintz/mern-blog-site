const express = require("express");
const postController = require("../../controllers/Post/postController");

//! create instance of express router
const postRouter = express.Router();

// ----------create post-----------------
postRouter.post(
    "/posts/create",
    postController.createPost,
);

// ----------list all posts-----------------
postRouter.get(
    "/posts",
    postController.fetchAllPosts,
);

// ----------update post-----------------
postRouter.put(
    "/posts/:postId",
    postController.update,
);

// ------------Get post-------------
postRouter.get(
    "/posts/:postId",
    postController.getPost,
);

// ----------Delete post---------------
postRouter.delete(
    "/posts/:postId",
    postController.delete,
);

module.exports = postRouter;
