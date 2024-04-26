import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const CreatePost = () => {
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
            console.log(values)
        }
    })
    return (
        <div>
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