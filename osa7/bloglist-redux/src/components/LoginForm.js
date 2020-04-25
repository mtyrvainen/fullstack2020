import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { login } from '../reducers/loginReducer'

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
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username <input id="username" type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          Password <input id="password" type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button id="login-button" type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm