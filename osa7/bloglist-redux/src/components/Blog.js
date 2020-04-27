import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useParams, useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { likeId, removeBlog, addComment } from '../reducers/blogReducer'

//Material UI
import { TextField, Button, Typography, Box } from '@material-ui/core'

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

  const handleCommentChange = (event) => {
    setComment(event)
  }

  const postComment = async (event) => {
    event.preventDefault()

    const newComment = {
      id: blogDetail.id,
      comment: {
        comment
      }
    }
    try {
      await dispatch(addComment(newComment))
      dispatch(setNotification('New comment added', 'notification'))
      setComment('')
    } catch (exception) {
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

  const displayComments = (comment) => (
    <Box component="span" display="block" bgcolor="background.paper" p={2}>
      <Typography variant="h5">Comments</Typography>
      {blogDetail.comments.length > 0 ? <ul>{blogDetail.comments.map((comment, index) => <li key={index} ><Typography variant="body1">{comment}</Typography></li>)}</ul> : <div><p>No comments yet...</p></div>}
      <form onSubmit={postComment}>
        <TextField label="Leave a comment..." id="comment" type="text" value={comment} name="comment" onChange={({ target }) => handleCommentChange(target.value)} />
        {comment === ''
          ? <Button variant="contained" color="primary" size="small" disabled>Post a comment</Button>
          : <Button variant="contained" color="primary" size="small" type="submit">Post a comment</Button>
        }
      </form>
    </Box>
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
      <Box component="span" display="block" bgcolor="background.paper" p={2}>
        <Typography p={1} variant="h5">&quot;{blogDetail.title}&quot; by {blogDetail.author}</Typography>
        <Box component="span" display="block" bgcolor="background.paper" p={1}>
          <Typography variant="body1">More info at: <a href={`http://${blogDetail.url}`}>{blogDetail.url}</a></Typography>
          <Typography component="div" display="inline" variant="body1">{blogDetail.likes} likes</Typography>
          <Button component="div" display="inline" size="small" variant="outlined" color="default" onClick={() => handleLikes(blogDetail)}>Like</Button>
          <Typography variant="body1">added by <Link to={`/users/${blogDetail.user.id}`}>{blogDetail.user.name}</Link></Typography>
        </Box>
      </Box>
      {displayRemoveButton()}
      {displayComments(comment)}
    </div>
  )
}

Blog.propTypes = {
  blogs: PropTypes.array.isRequired
}

export default Blog