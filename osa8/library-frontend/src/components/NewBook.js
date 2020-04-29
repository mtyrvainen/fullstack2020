import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_BOOK, ALL_BOOKS, ALL_AUTHORS } from '../queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  const [ createBook ] = useMutation(CREATE_BOOK, {
    refetchQueries: [ { query: ALL_BOOKS }, { query: ALL_AUTHORS } ],
    onError: (error) => {
      if (error.networkError) {
        showError('400 Bad Request: Please fill all fields')
      } else {
        console.log('Error occured', error)
      }
    }
  })

  const showError = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  if (!props.show) {
    return null
  }

  const displayError = () => {
    if ( !errorMessage ) {
      return null
    }
    return (
      <div style={{ color: 'red' }}>
        {errorMessage}
      </div>
    )
  }

  const submit = async (event) => {
    event.preventDefault()

    console.log('add book...')
    createBook({ variables: { title, author, published, genres } })

    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(Number(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
      <div>{displayError()}</div>
    </div>
  )
}

export default NewBook