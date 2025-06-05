import CreatePost from './components/Posts/CreatePost'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PostsList from './components/Posts/PostsList.jsx'
import PublicNavbar from './components/Navbar/PublicNavbar'
import UpdatePost from './components/Posts/UpdatePost.jsx'
import Home from './components/Home/Home.jsx'

function App() {
  return (
    <BrowserRouter>
      {/* Navbar */}
      <PublicNavbar />
      <Routes>
        {/* create post */}
        <Route element={<Home />} path='/' />
        <Route element={<CreatePost />} path='/create-post' />
        <Route element={<PostsList />} path='/posts' />
        <Route element={<UpdatePost />} path='/posts/:postId' />
        {/* <CreatePost />
        <PostsList /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
