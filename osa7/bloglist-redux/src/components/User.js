import React from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

//Material UI
import { Typography, Box } from '@material-ui/core'

const User = ({ users }) => {
  const id = useParams().id
  const userDetail = users.find(u => u.id === id)
  if (!userDetail) {
    return null
  }
  return (
    <div>
      <Box component="span" display="block" bgcolor="background.paper" p={2}>
        <Typography variant="h5">{userDetail.name}</Typography>
        <Typography variant="body1">Username: {userDetail.username}</Typography>
      </Box>

      <Box component="span" display="block" bgcolor="background.paper" p={2}>
        {userDetail.blogs.length > 0 ? <Typography variant="h6">Added blogs:</Typography> : null}
        <ul>
          {userDetail.blogs.map(blog => <li key={blog.id}><Link to={`/blogs/${blog.id}`}><Typography variant="body1">{blog.title}</Typography></Link></li>)}
        </ul>
      </Box>
    </div>
  )
}

User.propTypes = {
  users: PropTypes.array.isRequired
}

export default User