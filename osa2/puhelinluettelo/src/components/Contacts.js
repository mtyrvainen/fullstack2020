/* eslint-disable react/prop-types */
import React from 'react'

const Contacts = ({ persons, filter, removeName }) => {
	const filteredContacts = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

	return (
		<div>
			{filteredContacts.map(person =>
				<Person key={person.name} person={person} removeName={() => removeName(person.id)} />)}

		</div>
	)
}

const Person = ({ person, removeName }) => <>{person.name} {person.number} <button onClick={removeName}>delete</button><br /></>

export default Contacts