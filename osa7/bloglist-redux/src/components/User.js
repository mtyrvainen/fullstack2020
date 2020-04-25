import React from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const User = ({ users }) => {
  const id = useParams().id
  const userDetail = users.find(u => u.id === id)
  if (!userDetail) {
    return null
  }
  return (
    <div>
      <h2>{userDetail.name}</h2>
      <div>Username: {userDetail.username}</div>
      <h3>Added blogs:</h3>
      <ul>
        {userDetail.blogs.map(blog => <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>)}
      </ul>
    </div>
  )
}

User.propTypes = {
  users: PropTypes.array.isRequired
}

export default User