import CreatePost from './components/Posts/CreatePost'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PostsList from './components/Posts/PostsList.jsx'
import PublicNavbar from './components/Navbar/PublicNavbar'
import Home from './components/Home/Home.jsx'
import PostDetails from './components/Posts/PostDetails.jsx'

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
        <Route element={<PostDetails />} path='/posts/:postId' />
        {/* <Route element={<UpdatePost />} path='/posts/:postId' /> */}
        {/* <CreatePost />
        <PostsList /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
