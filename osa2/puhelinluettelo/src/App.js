import React, { useState, useEffect } from 'react'
import Contacts from './components/Contacts'
import FilterForm from './components/FilterForm'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personService from './services/personservice'

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
		personService
			.getAll()
			.then(existingContacts => {
				setPersons(existingContacts)
			})
	}, [])

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

		personService
			.update(person.id, updatedPerson)
			.then(() => {
				setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson))
				displayNotification(`Number for '${oldName}' updated`, 'notification')
				setNewName('')
				setNewNumber('')
			})
			.catch(error => {
				displayNotification(`ERROR: ${error.response.data.error}`, 'error')
			})
	}

	const addPerson = (event) => {
		event.preventDefault()

		if (!newName || !newNumber) {
			displayNotification('ERROR: Name and number must both be provided for new contacts', 'error')
			return
		}

		if (persons.find(o => o.name === newName)) {
			if (window.confirm(`${newName} is already addded to phonebook, replace the old number with a new one?`)) {
				updateName(newName, newNumber)
				return
			} else {
				return
			}
		}

		const newPerson = {
			name: newName,
			number: newNumber
		}

		personService
			.create(newPerson)
			.then(returnedPerson => {
				setPersons(persons.concat(returnedPerson))
				setNewName('')
				setNewNumber('')
				displayNotification(`'${newName} ${newNumber}' added to phonebook`, 'notification')
			})
			.catch(error => {
				displayNotification(`ERROR: ${error.response.data.error}`, 'error')
			})
	}

	const removeName = id => {
		if (window.confirm(`Delete '${persons.find(p => p.id === id).name}'?`)) {
			let deleted = persons.find(p => p.id === id).name

			personService
				.remove(id)
				.then(() => {
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
			<PersonForm submitfunction={addPerson} nameValue={newName} nameChangeFunction={handleNameChange} numberValue={newNumber} numberChangeFunction={handleNumberChange} />

			<h2>Numbers</h2>
			<Contacts persons={persons} filter={contactFilter} removeName={removeName} />
		</div>
	)

}

export default App