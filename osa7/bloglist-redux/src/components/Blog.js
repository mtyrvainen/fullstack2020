import React from 'react'
import PropTypes from 'prop-types'
import { useParams, useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { likeId, removeBlog } from '../reducers/blogReducer'

const Blog = ({ blogs }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const user = useSelector(state => state.user.user)
  const id = useParams().id
  const blogDetail = blogs.find(b => b.id === id)

  if (!blogDetail) {
    return null
  }

  const handleLikes = async (blog) => {
    try {
      await dispatch(likeId(blog.id))
      dispatch(setNotification(`Blog "${blog.title}" updated +1 like`, 'notification'))
    } catch (exception) {
      dispatch(setNotification('Error: couldn\'t register like', 'error'))
    }
  }

  const displayRemoveButton = (blog) => {
    if (user && blog.user.username === user.username) {
      return (
        <div><button id="remove-blog-button" onClick={() => deleteBlog(blog)}>Remove</button></div>
      )
    }
  }

  const deleteBlog = async (blogToRemove) => {
    if (!window.confirm(`Remove blog "${blogToRemove.title}" by ${blogToRemove.author}?`)) {
      return
    }

    try {
      await dispatch(await removeBlog(blogToRemove))
      dispatch(setNotification(`Blog "${blogToRemove.title}" removed`, 'notification'))
      history.push('/')
    } catch (exception) {
      dispatch(setNotification('Error: removing blog', 'error'))
    }
  }

  return (
    <div>
      <h2>{blogDetail.title}</h2>
      <div>
        More info at: <a href={`http://${blogDetail.url}`}>{blogDetail.url}</a><br />
        {blogDetail.likes} likes<button onClick={() => handleLikes(blogDetail)}>Like</button><br />
        added by <Link to={`/users/${blogDetail.user.id}`}>{blogDetail.user.name}</Link><br />
      </div>
      {displayRemoveButton(blogDetail)}
    </div>
  )
}

Blog.propTypes = {
  blogs: PropTypes.array.isRequired
}

export default Blog