import React from 'react'
import { Link } from 'react-router-dom'

//Material UI
import { Table, TableBody, TableHead, TableCell, TableContainer, TableRow, Typography } from '@material-ui/core'

const UserTable = ({ users }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Blogs created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user =>
            <TableRow key={user.id}>
              <TableCell><Typography variant="body1" component={Link} to={`/users/${user.id}`}>{user.name}</Typography></TableCell>
              <TableCell><Typography variant="body1">{user.blogs.length}</Typography></TableCell>
            </TableRow>)}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default UserTable