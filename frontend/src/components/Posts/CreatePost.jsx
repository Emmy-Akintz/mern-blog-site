import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation } from '@tanstack/react-query'
import { createPostAPI } from '../../APIServices/posts/postsAPI'

const CreatePost = () => {
    // post mutation
    const postMutation = useMutation({
        mutationKey: ['create-post'],
        mutationFn: createPostAPI
    })
    const formik = useFormik({
        // initial data
        initialValues: {
            title: '',
            description: ''
        },
        // validation
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            description: Yup.string().required('Description is required')
        }),
        // submit
        onSubmit: (values) => {
            const postData = {
                title: values.title,
                description: values.description
            }
            postMutation.mutate(postData)
        }
    })
    // get loading state
    const isLoading = postMutation.isPending
    // is error
    const isError = postMutation.isError
    // success
    const isSuccess = postMutation.isSuccess
    // error
    const error = postMutation.error

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {isSuccess && <p>Post created successfully</p>}
            {isError && <p>{error.message}</p>}
            <form onSubmit={formik.handleSubmit}>
                <input
                    type="text"
                    name='title'
                    placeholder='Enter Title'
                    {...formik.getFieldProps('title')}
                />
                {/* display err msg */}
                {formik.touched.title && formik.errors.title &&
                    <span style={{ color: 'red' }}>{formik.errors.title}</span>}
                <input
                    type="text"
                    name='description'
                    placeholder='Enter Description'
                    {...formik.getFieldProps('description')}
                />
                {/* display err msg */}
                {formik.touched.description && formik.errors.description &&
                    <span style={{ color: 'red' }}>{formik.errors.description}</span>}
                <button type='submit'>Create</button>
            </form>
        </div>
    )
}

export default CreatePost