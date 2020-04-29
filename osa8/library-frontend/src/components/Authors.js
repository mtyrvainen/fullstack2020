import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries'
import Select from 'react-select'


const Authors = (props) => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [selectedAuthor, setSelectedAuthor] = useState('')

  const result = useQuery(ALL_AUTHORS)

  const [ updateAuthor ] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
    onError: (error) => {
      if (error.networkError) {
        showError('400 Bad Request: Please fill all fields')
      } else {
        console.log('Error occured', error)
      }
    }
  })

  if (!props.show) {
    return null
  }

  const showError = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
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

  let authors = []
  let options = []

  if (result.loading) {
    console.log('ladataan...')
  } else {
    authors = result.data.allAuthors
    options = authors.map(author => {
      return { value: author.name, label: author.name }
    })
  }

  const submit = async (event) => {
    event.preventDefault()

    console.log('update birth year...')
    updateAuthor({ variables: { name, year } })

    setName('')
    setYear('')
  }

  const handleAuthorChange = (selectedOption) => {
    setSelectedAuthor(selectedOption)
    setName(selectedOption.value)
  }

  return (
    <div>
      <div>
        <h2>Authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
              born
              </th>
              <th>
              books
              </th>
            </tr>
            {authors.map(a =>
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div>
        <h3>Set birthyear</h3>
        <form onSubmit={submit}>
          <Select
            value={selectedAuthor}
            onChange={handleAuthorChange}
            options={options} />
          <div>
            Born:
            <input
              type='number'
              value={year}
              onChange={({ target }) => setYear(Number(target.value))}
            />
          </div>
          <button type='submit'>Update author info</button>
        </form>
      </div>
      <div>{displayError()}</div>
    </div>
  )
}

export default Authors
