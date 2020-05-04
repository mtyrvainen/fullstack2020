
import React, { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [notification, setNotification] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    setToken(localStorage.getItem('library-user-token'))
  }, [setToken])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()

    if (page === 'add') {
      setPage('login')
    }
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