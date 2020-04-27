import React, { useState } from 'react'
import PropTypes from 'prop-types'

//Material UI
import { Box, TextField, Button, Typography } from '@material-ui/core'

const BlogForm = ({ createBlog }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()

    const success = await createBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    })

    if (success) {
      setBlogTitle('')
      setBlogAuthor('')
      setBlogUrl('')
    }
  }

  return (
    <div>
      <Typography variant="h5">Create a new blog listing</Typography>
      <form onSubmit={addBlog}>
        <Box component="span" display="block" bgcolor="background.paper" pb={2}>
          <div>
            <TextField label="Title" id="title" type="text" value={blogTitle} name="title" onChange={({ target }) => setBlogTitle(target.value)} />
          </div>
          <div>
            <TextField label="Author" id="author" type="text" value={blogAuthor} name="author" onChange={({ target }) => setBlogAuthor(target.value)} />
          </div>
          <div>
            <TextField label="URL" id="url" type="text" value={blogUrl} name="url" onChange={({ target }) => setBlogUrl(target.value)} />
          </div>
        </Box>
        <Button variant="outlined" color="primary" id="add-blog" type="submit">Create</Button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm