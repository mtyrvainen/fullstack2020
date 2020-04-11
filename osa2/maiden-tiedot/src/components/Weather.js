import React from 'react'

const Weather = ({ country, weather }) => {
    if (weather.length === 0) {
      return (
        <div>
            <h2>Weather in {country.capital}</h2>
            <p>Fetching data...</p>
        </div>
      )
    } else {
      return (
        <div>
          <h2>Weather in {country.capital}</h2>
          <b>Temperature: </b> {weather.current.temperature}<br />
          <img src={weather.current.weather_icons[0]} alt={"weather in " + country.capital} /><br />
          <b>Wind: </b> {weather.current.wind_speed} mph, direction {weather.current.wind_dir}
        </div>
      )
    }
}

export default Weather