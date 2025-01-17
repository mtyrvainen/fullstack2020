import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries'
import Select from 'react-select'


const Authors = ({ show, token, handleNotification }) => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')
  const [selectedAuthor, setSelectedAuthor] = useState('')

  const result = useQuery(ALL_AUTHORS)

  const [ updateAuthor ] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
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

  if (!show) {
    return null
  }

  let authors = []
  let options = []

  if (!result.loading) {
    authors = result.data.allAuthors
    options = authors.map(author => {
      return { value: author.name, label: author.name }
    })
  }

  const submit = async (event) => {
    event.preventDefault()
    updateAuthor({ variables: { name, year } })
    setName('')
    setYear('')
  }

  const handleAuthorChange = (selectedOption) => {
    setSelectedAuthor(selectedOption)
    setName(selectedOption.value)
  }

  const displayEdit = () => {
    if (!token) {
      return null
    }

    return (
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
    )
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
      {displayEdit()}
    </div>
  )
}

export default Authors
