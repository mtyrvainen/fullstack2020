import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Weather from './Weather'

const CountryDetails = ({ apiKey, country }) => {
    const [ capitalWeather, setCapitalWeather ] = useState([])
  
    useEffect(() => {
      axios
        .get("http://api.weatherstack.com/current?access_key=" + apiKey + "&query=" + country.capital)
        .then(response => {
          setCapitalWeather(response.data)
        })
    }, [country, apiKey])

    return (
      <div>
        <div>
          <h1>{country.name}</h1>
          <b>Capital:</b> {country.capital} <br />
          <b>Population:</b> {country.population}
        </div>
        <div>
          <h2>Spoken languages</h2>
          <ul>
            {country.languages.map(language => 
                <li key={language.name}>{language.name}</li>
              )}
          </ul>
          <img src={country.flag} alt={"Flag of " + country.name} width="100px" />
        </div>
        <Weather country={country} weather={capitalWeather} />
      </div>
    )
}

export default CountryDetails