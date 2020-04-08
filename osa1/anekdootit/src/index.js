import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ( { onClick, text } ) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Header = (props) => (
  <h1>{props.header}</h1>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(props.anecdotes.length))

  const handleNewAnecdote = () => setSelected(Math.floor(Math.random() * (props.anecdotes.length)))
  
  const handleVote = () => {
    const newVotes = [ ...votes ]
    newVotes[selected] += 1

    setVotes(newVotes)
  }

  const findHighestVoted = () => {
    let highest = Math.max.apply(null, votes)

    let i = 0;
    for (i; i < votes.length; i++) {
      if (votes[i] === highest) {
        return i
      }
    }  
  }

  return (
    <div>
      <Header header="Anecdote of the day" />
      {props.anecdotes[selected]}
      <br />
      Has {votes[selected]} votes
      <br />
      <Button onClick={handleVote} text="Vote" />
      <Button onClick={handleNewAnecdote} text="New anecdote" />
      
      <Header header="Anecdote with most votes" />
      {props.anecdotes[findHighestVoted()]}
      <br />
      Has {votes[findHighestVoted()]} votes
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)