import React from 'react'
import Blog from './BlogElement'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { likeId, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

//Material UI imports:
import { Box, Table, TableBody, TableHead, TableCell, TableContainer, TableRow, Typography } from '@material-ui/core'

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
    <Box component="span" display="block" bgcolor="background.paper" p={2}>
      <Typography variant="h4">Blogs</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Blog Title</TableCell>
              <TableCell>Author</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs.sort((blog1, blog2) => blog2.likes - blog1.likes).map(blog =>
              <TableRow key={blog.id}>
                <TableCell>
                  <Blog key={blog.id} blog={blog} handleLikes={handleLikes} removeBlog={deleteBlog} loggedUser={user} />
                </TableCell>
                <TableCell>
                  <Typography variant="body1" component={Link} to={`/users/${blog.user.id}`}>{blog.author}</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default BlogList