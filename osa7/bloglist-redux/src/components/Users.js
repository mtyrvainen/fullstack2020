import React from 'react'
import UserTable from './UserTable'

const Users = ({ users }) => {

  console.log('users from users', users)
  return (
    <div>
      <h2>Users</h2>
      {users ? <UserTable users={users}/> : null}
    </div>
  )
}

export default Users