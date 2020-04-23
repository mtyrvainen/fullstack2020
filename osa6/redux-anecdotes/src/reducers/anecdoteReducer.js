import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE':
      const id = action.id
      const anecdoteVoted = state.find(anec => anec.id === id)
      const updatedAnecdote = {
        ...anecdoteVoted,
        votes: anecdoteVoted.votes + 1
      }
      return state.map(anec => anec.id !== id ? anec : updatedAnecdote)
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const voteForId = (id) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateVotes(id)
    dispatch({
      type: 'VOTE',
      id: updatedAnecdote.id
    })
  }
}

export const createAnecdote = (data) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.add(data)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdoteReducer