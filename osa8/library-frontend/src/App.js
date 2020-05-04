
import React, { useState, useEffect } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { BOOK_ADDED, ALL_BOOKS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [notification, setNotification] = useState(null)
  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => set.map(book => book.title).includes(object.title)
    const dataInStore = client.readQuery({ query: ALL_BOOKS })

    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      console.log(subscriptionData)
      handleNotification(`New book added: ${subscriptionData.data.bookAdded.title}`)
      updateCacheWith(addedBook)
    }
  })

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