import React, { useState, useEffect } from 'react'
import Contacts from './components/Contacts'
import FilterForm from './components/FilterForm'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import contactService from './services/contactservice'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ contactFilter, setContactFilter ] = useState('')
  const [ notificationText, setNotificationText ] = useState(null)
  const [ notificationType, setNotificationType ] = useState('notification')
 
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

  const displayNotification = (text, type) => {
    setNotificationType(type)
    setNotificationText(text)
    setTimeout( () => {
      setNotificationText(null)
    }, 5000)
  }

  const updateName = (oldName, updatedNumber) => {
    const person = persons.find(person => person.name === oldName)
    const updatedPerson = { ...person, number: updatedNumber }

    contactService
      .update(person.id, updatedPerson)
      .then(existingPerson => {
        setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson))
        displayNotification(`Number for '${oldName}' updated`, 'notification')
      })
      .catch(error => {
        displayNotification(`ERROR: ${oldName} has already been removed from server`, 'error')
        setPersons(persons.filter(p => p.id !== updatedPerson.id))
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
        displayNotification(`'${newName} ${newNumber}' added to phonebook`, 'notification')
      })
  }

  const removeName = id => {
    if (window.confirm(`Delete '${persons.find(p => p.id === id).name}'?`)) {
      let deleted = persons.find(p => p.id === id).name

      contactService
        .remove(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
          displayNotification(`'${deleted}' has been removed from phonebook`, 'notification')
        })
    }
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification text={notificationText} type={notificationType} />
      <FilterForm filterValue={contactFilter} filterFunction={handleFilterChange} />

      <h2>Add a new contact</h2>
      <PersonForm submitfunction={addName} nameValue={newName} nameChangeFunction={handleNameChange} numberValue={newNumber} numberChangeFunction={handleNumberChange} />
      
      <h2>Numbers</h2>
      <Contacts persons={persons} filter={contactFilter} removeName={removeName} />
    </div>
  )

}

export default App