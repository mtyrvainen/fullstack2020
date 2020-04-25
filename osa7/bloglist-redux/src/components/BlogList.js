import React from 'react'
import Blog from './BlogElement'
import { useDispatch, useSelector } from 'react-redux'
import { likeId, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user.user)

  const handleLikes = async (blog) => {
    try {
      await dispatch(likeId(blog.id))
      dispatch(setNotification(`Blog "${blog.title}" updated +1 like`, 'notification'))
    } catch (exception) {
      dispatch(setNotification('Error: couldn\'t register like', 'error'))
    }
  }

  const deleteBlog = async (blogToRemove) => {
    if (!window.confirm(`Remove blog "${blogToRemove.title}" by ${blogToRemove.author}?`)) {
      return
    }

    try {
      await dispatch(await removeBlog(blogToRemove))
      dispatch(setNotification(`Blog "${blogToRemove.title}" removed`, 'notification'))
    } catch (exception) {
      dispatch(setNotification('Error: removing blog', 'error'))
    }
  }

  return (
    <div>
      {blogs.sort((blog1, blog2) => blog2.likes - blog1.likes).map(blog =>
        <Blog key={blog.id} blog={blog} handleLikes={handleLikes} removeBlog={deleteBlog} loggedUser={user} />
      )}
    </div>
  )
}

export default BlogList