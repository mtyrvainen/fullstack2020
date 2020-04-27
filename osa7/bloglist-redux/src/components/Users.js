import React from 'react'
import UserTable from './UserTable'

//Material UI
import { Box, Typography } from '@material-ui/core'

const Users = ({ users }) => {

  console.log('users from users', users)
  return (
    <Box component="span" display="block" bgcolor="background.paper" p={2}>
      <Typography variant="h4">Users</Typography>
      {users ? <UserTable users={users}/> : null}
    </Box>
  )
}

export default Users