import axios from 'axios'
// create a function that must return a promise
const BASE_URL = import.meta.env.VITE_SERVER_LINK
//! create post api
export const createPostAPI = async (postData) => {
    console.log(postData)
    const response = await axios.post(`${BASE_URL}/api/v1/posts/create`, { postData })
    return response.data
} //? any function or asynchronous function with a return is a promise
