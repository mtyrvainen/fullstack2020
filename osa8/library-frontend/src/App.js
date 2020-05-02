
import React, { useState, useEffect } from 'react'
import { useApolloClient, useQuery } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { LOGGED_USER } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [notification, setNotification] = useState(null)
  const client = useApolloClient()

  let userGenre
  let userResult = useQuery(LOGGED_USER, { pollInterval: 1000 })

  console.log('token @ App', token)

  useEffect(() => {
    console.log('localstorage @ App', localStorage.getItem('library-user-token'))
    setToken(localStorage.getItem('library-user-token'))
  }, [setToken])

  if (!userResult.loading && userResult.data.me) {
    console.log('userGenre @ App', userResult.data.me)
    userGenre = userResult.data.me.favoriteGenre
  }

  const logout = () => {
    userGenre = null
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const handleNotification = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 10000)
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>Authors</button>
        <button onClick={() => setPage('books')}>Books</button>
        {token && <button onClick={() => setPage('add')}>Add book</button>}
        {token && <button onClick={() => logout()}>Logout</button>}
        {!token && <button onClick={() => setPage('login')}>Login</button>}
      </div>

      {notification && <div style={{ color: 'red' }}>{notification}</div>}

      <Authors
        show={page === 'authors'}
        token={token}
        handleNotification={handleNotification}
      />

      <Books
        show={page === 'books'}
        userGenre={userGenre}
      />

      <NewBook
        show={page === 'add'}
        handleNotification={handleNotification}
      />

      <Login
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
        handleNotification={handleNotification}
      />

    </div>
  )
}

export default App