import React from 'react'
import Togglable from './Togglable'
import PropTypes from 'prop-types'

const Blog = ({ blog, loggedUser, handleLikes, removeBlog }) => {
  const blogDetailRef = React.createRef()

  const toggleDetails = () => {
    blogDetailRef.current.toggleVisibility()
  }

  const displayRemoveButton = () => {
    if (loggedUser && blog.user.username === loggedUser.username) {
      return (
        <div><button id="remove-blog-button" onClick={() => removeBlog(blog)}>Remove</button></div>
      )
    }
  }

  return (
    <div className="blog-entry">
      <Togglable buttonLabel="View" defaultText={`"${blog.title}" by ${blog.author}`} showCancel={false} ref={blogDetailRef} >
        <div id="blog-title" className="blogTitle">&quot;{blog.title}&quot; by {blog.author} <button onClick={toggleDetails}>Hide</button></div>
        <div id="blog-url" className="blogUrl">URL: {blog.url}</div>
        <div id="blog-likes" className="blogLikes">Likes: {blog.likes} <button id="blog-like-button" onClick={() => handleLikes(blog)}>Like</button></div>
        <div className="blogAdder">Added by: {blog.user.name}</div>
        {displayRemoveButton()}
      </Togglable>
    </div>
  )
}

Blog.propTypes = {
  handleLikes: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog
