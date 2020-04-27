import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { login } from '../reducers/loginReducer'

//Material UI
import { Box, TextField, Button, Typography } from '@material-ui/core'

const LoginForm = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    if (username && password) {
      try {
        await dispatch(await login(username, password))
        dispatch(setNotification('Success: Login', 'notification'))
      } catch (error) {
        dispatch(setNotification('Error: Wrong username and password', 'error'))
      }
    } else {
      dispatch(setNotification('Error: Enter username and password', 'error'))
    }
  }

  return (
    <Box component="span" display="block" bgcolor="background.paper">
      <Typography variant="h5">Login</Typography>
      <form onSubmit={handleLogin}>
        <Box component="span" display="block" bgcolor="background.paper" pb={2}>
          <div>
            <TextField label="Username" id="username" type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
          </div>
          <TextField label="Password" id="password" type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
        </Box>
        <div>
          <Button variant="contained" color="primary" id="login-button" type="submit">Log in</Button>
        </div>
      </form>
    </Box>
  )
}

export default LoginForm