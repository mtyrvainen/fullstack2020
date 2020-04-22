import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteForId } from '../reducers/anecdoteReducer'

const AnecdoteList = (props) => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state) 
  
  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteForId(id))
  }

  return (
    <div>
      {anecdotes.sort((a1, a2) => a2.votes - a1.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList