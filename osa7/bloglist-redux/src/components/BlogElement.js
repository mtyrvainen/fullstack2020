import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Typography } from '@material-ui/core'

const BlogElement = ({ blog }) => {
  return (
    <Typography variant="body1" component={Link} to={`/blogs/${blog.id}`}>{blog.title}</Typography>
  )
}

BlogElement.propTypes = {
  handleLikes: PropTypes.func,
  removeBlog: PropTypes.func
}

export default BlogElement