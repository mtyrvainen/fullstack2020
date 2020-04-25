import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const BlogElement = ({ blog }) => {
  return (
    <div className="blog-entry">
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> by {blog.author}
    </div>
  )
}

BlogElement.propTypes = {
  handleLikes: PropTypes.func,
  removeBlog: PropTypes.func
}

export default BlogElement
