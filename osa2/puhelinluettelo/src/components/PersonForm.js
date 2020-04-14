/* eslint-disable react/prop-types */
import React from 'react'

const PersonForm = ({ submitfunction, nameValue, nameChangeFunction, numberValue, numberChangeFunction }) => {
	return (

		<form onSubmit={submitfunction}>
			<div>
          Name: <input value={nameValue} onChange={nameChangeFunction} />
			</div>
			<div>
          Number: <input value={numberValue} onChange={numberChangeFunction} />
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	)
}

export default PersonForm