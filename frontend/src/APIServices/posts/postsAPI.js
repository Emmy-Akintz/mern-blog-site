import axios from 'axios'
// create a function that must return a promise
const BASE_URL = import.meta.env.VITE_SERVER_LINK

//! create post api
export const createPostAPI = async (postData) => {
    console.log(postData)
    const response = await axios.post(`${BASE_URL}/create`, { 
        title: postData.title,
        description: postData.description
     })
    return response.data
} //? any function or asynchronous function with a return is a promise

//! fetch all posts
export const fetchAllPosts = async (req, res) => {
    const posts = await axios.get(BASE_URL)
    return posts.data
}