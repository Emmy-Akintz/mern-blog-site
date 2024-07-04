import { useState } from 'react'
import CreatePost from './components/Posts/CreatePost'
import PostsList from './components/PostsList'

function App() {
  return (
    <div>
      <CreatePost />
      <PostsList />//!3.32
    </div>
  )
}

export default App
