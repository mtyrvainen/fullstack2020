import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, updateBlog }) => {
  const blogDetailRef = React.createRef()

  const toggleDetails = () => {
    blogDetailRef.current.toggleVisibility()
  }
  console.log('blog:', blog)
  return (
      <>
      <div className="blog-entry">
        <Togglable buttonLabel="View" tempText={`"${blog.title}" by ${blog.author}`} ref={blogDetailRef} >
          <div>"{blog.title}" by {blog.author}<button onClick={toggleDetails}>Hide</button></div>
          <div>URL: {blog.url}</div>
          <div>Likes: {blog.likes} <button onClick={() => updateBlog(blog)}>Like</button></div>
          <div>Added by: {blog.user.name}</div>
        </Togglable></div>
      </>
  )
}

export default Blog
