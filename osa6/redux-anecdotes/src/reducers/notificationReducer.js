const initialState = {
  text: '',
  timeoutID: ''
}

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      clearTimeout(state.timeoutID)
      const newNotification = {
        text: action.text,
        timeoutID: action.timeoutID
      }
      return newNotification
    case 'REMOVE_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

export const setNotification = (text, displaySecs) => {
  return async dispatch => {
    const timeoutID = setTimeout(() => {
      dispatch({
          type: 'REMOVE_NOTIFICATION'
      })
    }, displaySecs * 1000)
    
    dispatch({
      type: 'SET_NOTIFICATION',
      text,
      timeoutID
    }) 
  }
}

export default notificationReducer