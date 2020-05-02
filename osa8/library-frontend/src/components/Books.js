import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = ({ show, userGenre }) => {
  const result = useQuery(ALL_BOOKS)
  const [genreFilter, setGenreFilter] = useState('')
  const [showRecommended, setRecommended] = useState(false)

  let books = []
  let allGenres = []
  let filteredBooks = []

  if (!result.loading) {
    books = result.data.allBooks

    books.map(book => {
      book.genres.map(genre => {
        if (!allGenres.includes(genre)) {
          allGenres.push(genre)
        }
      })
    })

    if (genreFilter) {
      filteredBooks = books.filter(book => book.genres.includes(genreFilter))
    } else {
      filteredBooks = books
    }
  }

  if (!show) {
    return null
  }

  const handleFilter = (genre) => {
    if (genre === 'recommendation') {
      setRecommended(true)
      setGenreFilter(userGenre)
    } else {
      setRecommended(false)
      setGenreFilter(genre)
    }
  }

  const showGenreButtons = () => {
    return <div>{allGenres.map(genre => {
      if (genre === genreFilter) {
        return <button style={{border: '1px solid #0000ff'}} onClick={() => handleFilter(genre)} key={genre}>{genre}</button>
      } else {
        return <button onClick={() => handleFilter(genre)} key={genre}>{genre}</button>
      }
    })}
    {userGenre && <button style={{ border: showRecommended && genreFilter ? '1px solid #0000ff' : '' }} onClick={() => handleFilter('recommendation')}>Recommendations</button>}
    <button style={{ border: !genreFilter ? '1px solid #0000ff' : '' }} onClick={() => setGenreFilter('')}>ALL GENRES</button></div>
  }

  return (
    <div>
      <h2>Books</h2>
      {showGenreButtons()}
      <table  >
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filteredBooks.map(book =>
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books