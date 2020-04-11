import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SearchResults from './components/SearchResults'

/* apiKey value is read from environment variable REACT_APP_API_KEY
Can be set with: "REACT_APP_API_KEY=YourKeyValueHere npm start" in Linux
or "set REACT_APP_API_KEY=YourKey ValueHere" then "npm start" in Windows */
const apiKey = process.env.REACT_APP_API_KEY 

function App() {
  const [ countries, setCountries ] = useState([])
  const [ searchValue, setSearchValue ] = useState('')

  const handleSearchChange = (event) => {
    return(
      setSearchValue(event.target.value)
    )
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(searchValue.toLowerCase())) 

  return (
    <div>
      Find countries <input value={searchValue} onChange={handleSearchChange} /><br />
      <SearchResults apiKey={apiKey} countries={filteredCountries} showCountry={handleSearchChange} />
    </div>    
  )
}

export default App;
