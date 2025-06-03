import { useFormik } from 'formik'
import * as Yup from 'yup'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useMutation } from '@tanstack/react-query'
import { createPostAPI } from '../../APIServices/posts/postsAPI'

const CreatePost = () => {
    // state for wysiwyk
    // const [description, setDescription] = useState('');
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
    const { isLoading, isError, isSuccess, error } = postMutation;
    console.log(postMutation)
    const errMsg = error?.response?.data?.message || error?.message;
    console.log(errMsg);


    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {isSuccess && <p>Post created successfully</p>}
            {isError && <p style={{ color: "red" }}>{errMsg}</p>}
            <form onSubmit={formik.handleSubmit}>
                <ReactQuill
                    value={formik.values.description}
                    onChange={(value) => {
                        // setDescription(value)
                        formik.setFieldValue('description', value)
                    }}
                    placeholder='Write your post description here...'
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