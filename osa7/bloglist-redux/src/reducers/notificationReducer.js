const initialState = {
  notificationText: '',
  notificationType: 'notification',
  timeoutID: ''
}

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
  case 'SET_NOTIFICATION':
    clearTimeout(state.timeoutID)
    return {
      notificationText: action.notificationText,
      notificationType: action.notificationType,
      timeoutID: action.timeoutID
    }
  case 'REMOVE_NOTIFICATION':
    return initialState
  default:
    return state
  }
}

export const setNotification = (notificationText, notificationType) => {
  return async dispatch => {
    const timeoutID = setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION'
      })
    }, 5000)

    dispatch({
      type: 'SET_NOTIFICATION',
      notificationText,
      notificationType,
      timeoutID
    })
  }
}

export default notificationReducer