import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useParams, useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { likeId, removeBlog, addComment } from '../reducers/blogReducer'

const Blog = ({ blogs }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [comment, setComment] = useState('')

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

  const postComment = async (event) => {
    event.preventDefault()
    console.log('Nyt pitis lisätä kommentti')

    const newComment = {
      id: blogDetail.id,
      comment: {
        comment
      }
    }
    console.log('Tämä lisätään', newComment)
    try {
      await dispatch(addComment(newComment))
      console.log('Onnistus!')
      dispatch(setNotification('New comment added', 'notification'))
      setComment('')
    } catch (exception) {
      console.log('exception:', exception)
      dispatch(setNotification('Error posting a comment', 'error'))
    }
  }

  const displayRemoveButton = () => {
    if (user && blogDetail.user.username === user.username) {
      return (
        <div><button id="remove-blog-button" onClick={() => deleteBlog(blogDetail)}>Remove</button></div>
      )
    }
  }

  const displayComments = () => (
    <div>
      <h3>Comments</h3>
      <form onSubmit={postComment}>
        <input id="comment" type="text" value={comment} name="comment" onChange={({ target }) => setComment(target.value)} />
        <button>Post a comment</button>
      </form>
      {blogDetail.comments.length > 0 ? <ul>{blogDetail.comments.map((comment, index) => <li key={index} >{comment}</li>)}</ul> : <div><p>No comments yet...</p></div>}
    </div>
  )

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
      <h2>{blogDetail.title} by {blogDetail.author}</h2>
      <div>
        More info at: <a href={`http://${blogDetail.url}`}>{blogDetail.url}</a><br />
        {blogDetail.likes} likes<button onClick={() => handleLikes(blogDetail)}>Like</button><br />
        added by <Link to={`/users/${blogDetail.user.id}`}>{blogDetail.user.name}</Link><br />
      </div>
      {displayRemoveButton()}
      {displayComments()}
    </div>
  )
}

Blog.propTypes = {
  blogs: PropTypes.array.isRequired
}

export default Blog