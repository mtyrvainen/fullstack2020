import React from 'react'
import Togglable from './Togglable'
import PropTypes from 'prop-types'

const Blog = ({ blog, loggedUser, updateBlog, removeBlog }) => {
  const blogDetailRef = React.createRef()

  const toggleDetails = () => {
    blogDetailRef.current.toggleVisibility()
  }

  const displayRemoveButton = () => {
    if (loggedUser && blog.user.username === loggedUser) {
      return (
        <button onClick={() => removeBlog(blog)}>Remove</button>
      )
    }
  }

  return (
    <>
      <div className="blog-entry">
        <Togglable buttonLabel="View" tempText={`"${blog.title}" by ${blog.author}`} showCancel={false} ref={blogDetailRef} >
          <div>&quot;{blog.title}&quot; by {blog.author} <button onClick={toggleDetails}>Hide</button></div>
          <div>URL: {blog.url}</div>
          <div>Likes: {blog.likes} <button onClick={() => updateBlog(blog)}>Like</button></div>
          <div>Added by: {blog.user.name}</div>
          {displayRemoveButton()}
        </Togglable></div>
    </>
  )
}

Blog.propTypes = {
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog
