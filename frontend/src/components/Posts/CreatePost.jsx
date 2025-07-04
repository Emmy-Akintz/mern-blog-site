import { useFormik } from 'formik'
import * as Yup from 'yup'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useMutation } from '@tanstack/react-query'
import { createPostAPI } from '../../APIServices/posts/postsAPI'
import { useState } from 'react';

const CreatePost = () => {
    // state for wysiwyk
    const [
        // description,
        setDescription] = useState('');
    // post mutation
    const postMutation = useMutation({
        mutationKey: ['create-post'],
        mutationFn: createPostAPI
    })
    const formik = useFormik({
        // initial data
        initialValues: {
            description: ''
        },
        // validation
        validationSchema: Yup.object({
            description: Yup.string().required('Description is required')
        }),
        // submit
        onSubmit: (values) => {
            const postData = {
                description: values.description
            }
            postMutation.mutate(postData)
        }
    })
    const {
        // isLoading, isError, isSuccess,
        error } = postMutation;
    console.log(postMutation)
    const errMsg = error?.response?.data?.message || error?.message;
    console.log(errMsg);


    return (
        // <div>
        //     {isLoading && <p>Loading...</p>}
        //     {isSuccess && <p>Post created successfully</p>}
        //     {isError && <p style={{ color: "red" }}>{errMsg}</p>}
        //     <form onSubmit={formik.handleSubmit}>
        // <ReactQuill
        //     value={formik.values.description}
        //     onChange={(value) => {
        //         // setDescription(value)
        //         formik.setFieldValue('description', value)
        //     }}
        //     placeholder='Write your post description here...'
        // />
        //         {/* display err msg */}
        // {formik.touched.description && formik.errors.description &&
        //     <span style={{ color: 'red' }}>{formik.errors.description}</span>}
        // <button type='submit'>Create</button>
        //     </form>
        // </div>
        <div className="flex items-center justify-center">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 m-4">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
                    Add New Post
                </h2>
                {/* show alert */}

                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    {/* Description Input - Using ReactQuill for rich text editing */}
                    <div>
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Description
                        </label>
                        {/* ReactQuill here */}
                        <ReactQuill
                            value={formik.values.description}
                            onChange={(value) => {
                                setDescription(value)
                                formik.setFieldValue('description', value)
                            }}
                            placeholder='Write your post description here...'
                        />
                        {/* display err msg */}
                        {formik.touched.description && formik.errors.description &&
                            <span style={{ color: 'red' }}>{formik.errors.description}</span>}
                        <button type='submit'>Create</button>
                    </div>

                    {/* Category Input - Dropdown for selecting post category */}
                    <div>
                        <label
                            htmlFor="category"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Category
                        </label>
                        {/* display error */}
                        {/* {formik.touched.category && formik.errors.category && (
              <p className="text-sm text-red-600">{formik.errors.category}</p>
            )} */}
                    </div>

                    {/* Image Upload Input - File input for uploading images */}
                    <div className="flex flex-col items-center justify-center bg-gray-50 p-4 shadow rounded-lg">
                        <label
                            htmlFor="images"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Upload Image
                        </label>
                        <div className="flex justify-center items-center w-full">
                            <input
                                id="images"
                                type="file"
                                name="image"
                                accept="image/*"
                                // onChange={handleFileChange}
                                className="hidden"
                            />
                            <label
                                htmlFor="images"
                                className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
                            >
                                Choose a file
                            </label>
                        </div>
                        {/* Display error message */}
                        {/* {formik.touched.image && formik.errors.image && (
              <p className="text-sm text-red-600">{formik.errors.image}</p>
            )} */}

                        {/* error message */}
                        {/* {imageError && <p className="text-sm text-red-600">{imageError}</p>} */}

                        {/* Preview image */}

                        {/* {imagePreview && (
              <div className="mt-2 relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-2 h-24 w-24 object-cover rounded-full"
                />
                <button
                  onClick={removeImage}
                  className="absolute right-0 top-0 transform translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1"
                >
                  <FaTimesCircle className="text-red-500" />
                </button>
              </div>
            )} */}
                    </div>

                    {/* Submit Button - Button to submit the form */}
                    <button
                        type="submit"
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-orange-500 hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Add Post
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreatePost