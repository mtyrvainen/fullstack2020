import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({ good, neutral, bad}) => {
  let total = good + neutral + bad

  if (total === 0) {
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  } else {
    let average = (good - bad) / total
    let positive = (good / total * 100).toString() + " %"
    return(
      <div>
        <table>
          <tbody>
            <StatisticLine text="Good" value={good} />
            <StatisticLine text="Neutral" value={neutral} />
            <StatisticLine text="Bad" value={bad} />
            <StatisticLine text="Total" value={total} />
            <StatisticLine text="Average" value={average} />
            <StatisticLine text="Positive" value={positive} />
          </tbody>
        </table>
      </div>
    )
  }
}

const Button = ( { onClick, text } ) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Header = (props) => (
    <h1>{props.header}</h1>
)

const StatisticLine = ({ text, value }) => (
  <tr><td>{text}</td><td>{value}</td></tr>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
 
  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Header header="Give feedback" />
      <Button onClick={handleGood} text="Good" />
      <Button onClick={handleNeutral} text="Neutral" />
      <Button onClick={handleBad} text="Bad" />

      <Header header="Statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)