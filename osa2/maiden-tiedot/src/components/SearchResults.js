import React from 'react'
import CountryDetails from './CountryDetails'

const SearchResults = ({ apiKey, countries, showCountry }) => {
    if (countries.length > 10) {
      return (
        <p>Too many matches, specify another filter</p>
      )
    } else if (countries.length === 0) {
      return (
        <p>No matches</p>
      )
    } else {
      if (countries.length === 1) {
        return (
          <div>
            <CountryDetails apiKey={apiKey} country={countries[0]} />
          </div>
        )
      } else {
        return (
          <div>
            {countries.map(country => 
              <CountryNames key={country.alpha2Code} country={country} showCountry={showCountry} />
            )}
          </div>
        )
      }
    }  
}
  
const CountryNames = ({ country, showCountry }) => {
    return (
      <>{country.name} <button value={country.name} onClick={showCountry}>show</button><br /></>
    )
}
 

export default SearchResults