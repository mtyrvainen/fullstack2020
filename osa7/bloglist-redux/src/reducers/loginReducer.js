import loginService from '../services/login'
import blogService from '../services/blogs'

const initialState = {
  user: null
}

const loginReducer = (state = initialState, action) => {
  switch(action.type) {
  case 'LOGIN':
    return {
      user: action.user
    }
  case 'LOGOUT':
    return initialState
  case 'INIT_USER':
    return {
      user: action.user
    }
  default:
    return state
  }
}

export const login = (username, password) => {
  return async dispatch => {
    if (username && password) {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('blogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      await dispatch({
        type: 'LOGIN',
        user
      })
    }
  }
}

export const logout = () => {
  return async dispatch => {
    window.localStorage.clear()
    blogService.setToken(null)
    dispatch({
      type: 'LOGOUT',
    })
  }
}

export const initializeUser = () => {
  return async dispatch => {
    const blogUserJSON = window.localStorage.getItem('blogUser')

    if (blogUserJSON) {
      const user = JSON.parse(blogUserJSON)
      blogService.setToken(user.token)
      await dispatch({
        type: 'INIT_USER',
        user
      })
    } else {
      await dispatch({
        type: 'INIT_USER',
        user: null
      })
    }
  }
}

export default loginReducer