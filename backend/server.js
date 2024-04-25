require('dotenv').config()
// const dotenv = require('dotenv')
// dotenv.config()
const express = require('express')
const Post = require('./models/Post/Post')
const connectDB = require('./utils/connectDB')
// call the db
connectDB()
const app = express()

//* Middlewares
app.use(express.json()) //parse json data

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
//! List post
//! Update post
//! Get post
//! Delete post

//! PORT
const PORT = process.env.PORT || 5000
//! Start the server....
app.listen(PORT, console.log(`Server is up and running on port ${PORT}`))