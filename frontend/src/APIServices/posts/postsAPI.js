import axios from 'axios'
// create a function that must return a promise
const BASE_URL = import.meta.env.VITE_SERVER_LINK

//! create post api
export const createPostAPI = async (postData) => {
    console.log(postData)
    const response = await axios.post(`${BASE_URL}/create`, {
        description: postData.description
    })
    return response.data
} //? any function or asynchronous function with a return is a promise

//! update post api
export const updatePostAPI = async (postData) => {
    console.log(postData)
    const response = await axios.put(`${BASE_URL}/${postData?.postId}`, {
        title: postData.title,
        description: postData.description
    })
    return response.data
}

//! fetch all posts
export const fetchAllPosts = async () => {
    const posts = await axios.get(BASE_URL)
    return posts.data
}
//! fetch post
export const fetchPost = async (postId) => {
    const posts = await axios.get(`${BASE_URL}/${postId}`)
    return posts.data
}
//! delete post
export const deletePostAPI = async (postId) => {
    const posts = await axios.delete(`${BASE_URL}/${postId}`)
    return posts.data
}