const express = require("express");
const multer = require("multer");
const postController = require("../../controllers/Post/postController");
const storage = require("../../utils/fileUpload");
// create multer instance
const upload = multer({ storage });
//! create instance of express router
const postRouter = express.Router();

// ----------create post-----------------
postRouter.post(
    "/posts/create",
    upload.single('image'), // 'image' is the field name in the form
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
