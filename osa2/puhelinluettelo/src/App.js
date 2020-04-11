import React, { useState, useEffect } from 'react'
import Contacts from './components/Contacts'
import FilterForm from './components/FilterForm'
import PersonForm from './components/PersonForm'
import contactService from './services/contactservice'

const App = () => {
  const [ persons, setPersons] = useState([]) 

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ contactFilter, setContactFilter ] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setContactFilter(event.target.value)

  useEffect(() => {
    contactService
      .getAll()
      .then(existingContacts => {
        setPersons(existingContacts)
      })
  }, [])

  const findLargestId = (persons) => {
    let max = 0
    persons.map(person => {
      if (person.id > max) max = person.id
      return max
    }) 
  }

  const updateName = (oldName, updatedNumber) => {
    const person = persons.find(person => person.name === oldName)
    const updatedPerson = { ...person, number: updatedNumber }

    contactService
      .update(person.id, updatedPerson)
      .then(existingPerson => {
        setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson))
      })
  } 

  const addName = (event) => {
    event.preventDefault()

    if (persons.find(o => o.name === newName)) {
      if (window.confirm(`${newName} is already addded to phonebook, replace the old number with a new one?`)) {
        updateName(newName, newNumber)
        setNewName('')
        setNewNumber('')
        return
      } else {
        return
      }
    }

    const newPerson = {
      name: newName,
      number: newNumber,
      id: findLargestId(persons) + 1 
    }

    contactService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const removeName = id => {
    
    if (window.confirm(`Delete '${persons.find(p => p.id === id).name}'?`)) {

    contactService
      .remove(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm filterValue={contactFilter} filterFunction={handleFilterChange} />

      <h2>Add a new contact</h2>
      <PersonForm submitfunction={addName} nameValue={newName} nameChangeFunction={handleNameChange} numberValue={newNumber} numberChangeFunction={handleNumberChange} />
      
      <h2>Numbers</h2>
      <Contacts persons={persons} filter={contactFilter} removeName={removeName} />
    </div>
  )

}

export default App