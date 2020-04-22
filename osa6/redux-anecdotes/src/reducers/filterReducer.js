const filterReducer = (state = '', action) => {
  console.log('filter state now: ', state)
  console.log('filter action', action)

  switch(action.type) {
    case 'SET_FILTER':
      return action.filter
    default:
      return state
  }
}

export const setFilter = filter => {
  return {
    type: 'SET_FILTER',
    filter
  }
}

export default filterReducer