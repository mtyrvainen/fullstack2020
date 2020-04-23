import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteForId } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter) 
  
  const vote = async (id) => {
    dispatch(voteForId(id))
    dispatch(setNotification(`you voted for '${anecdotes.find(anec => anec.id === id).content}'`, 5))
  }

  return (
    <div>
      {anecdotes.filter(anec => anec.content.includes(filter)).sort((a1, a2) => a2.votes - a1.votes).map(anecdote =>
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