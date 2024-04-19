const express = require('express')
const Post = require('./models/Post/Post')
const app = express()

//* Middlewares
app.use(express.json()) //parse json data

//! Create post
app.post('/api/v1/post/create', async (req, res) => {
    try {
        //* get the payload
        const postData = req.body
        Post.create()
    } catch (error) {
        
    }
})
//! List post
//! Update post
//! Get post
//! Delete post

//! PORT
const PORT = 5000
//! Start the server....
app.listen(PORT, console.log(`Server is up and running on port ${PORT}`))