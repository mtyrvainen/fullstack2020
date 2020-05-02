import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN, LOGGED_USER } from '../queries'

const Login = ({ show, setToken, setPage, handleNotification }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login, result ] = useMutation(LOGIN, {
    refetchQueries: [ { query: LOGGED_USER } ],
    onError: (error) => {
      if (error.networkError) {
        handleNotification('Invalid input, please fill all the fields')
      } else if (error.graphQLErrors) {
        handleNotification(error.message)
      } else {
        console.log('Misc error', error.message)
      }
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
      console.log('kirjautuminen onnistunut')
    }
  }, [result.data, setToken])

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    const result = await login({ variables: { username, password } })

    if (result) {
      setUsername('')
      setPage('authors')
    }

    setPassword('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          Username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login