require('dotenv').config()
// const dotenv = require('dotenv')
// dotenv.config()
const express = require('express')
const Post = require('./models/Post/Post')
const cors = require('cors')
const connectDB = require('./utils/connectDB')
// call the db
connectDB()
const app = express()

//* Middlewares
app.use(express.json()) //parse json data

//* cors middleware
const corsOption = {
    origin: [process.env.WEBSITE],
    Credential: true
}
app.use(cors(corsOption))

//! Create post
app.post('/api/v1/posts/create', async (req, res) => {
    try {
        //* get the payload
        const postData = req.body
        const postCreated = await Post.create(postData)
        res.json({
            'status': 'success',
            'message': 'Post created successfully',
            postCreated
        })
    } catch (error) {
        console.log(error)
        res.json(error)
    }
})
//! List posts
app.get('/api/v1/posts', async (req, res) => {
    try {
        const posts = await Post.find()
        res.json({
            status: 'success',
            message: 'Post fetched successfully',
            posts
        })
    } catch (error) {
        res.json(error)
    }
})
//! Update post
app.put('/api/v1/posts/:postId', async (req, res) => {
    try {
        // get the post id from params
        const postId = req.params.postId
        // find the post
        const postFound = await Post.findById(postId)
        if (!postFound) {
            throw new Error('Post not found')
        }
        // update
        const postUpdated = await Post.findByIdAndUpdate(
            postId,
            { title: req.body.title, description: req.body.description },
            {
                new: true
            }
        )
        res.json({
            status: 'Post updated successfully',
            postUpdated
        })
    } catch (error) {
        throw new Error(error)
    }
})
//! Get post
app.get('/api/v1/posts/:postId', async (req, res) => {
    try {
        // get the post id from params
        const postId = req.params.postId
        // find the post
        const postFound = await Post.findById(postId)
        res.json({
            status: 'Post fetched successfully',
            postFound
        })
    } catch (error) {
        throw new Error(error)
    }
})
//! Delete post

//! PORT
const PORT = process.env.PORT || 5000
//! Start the server....
app.listen(PORT, console.log(`Server is up and running on port ${PORT}`))