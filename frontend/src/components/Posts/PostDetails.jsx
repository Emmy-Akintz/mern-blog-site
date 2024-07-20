import React from 'react'
import { useParams } from 'react-router-dom'

const PostDetails = () => {
  //! get the post id
  // ! 8.11
  const { postId } = useParams()

  return (
    <div>PostDetails</div>
  )
}

export default PostDetails