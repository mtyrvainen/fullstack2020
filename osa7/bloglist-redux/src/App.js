import React, { useEffect } from 'react'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
import {
  BrowserRouter as Router, Switch, Route, Link
} from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, addBlog } from './reducers/blogReducer'
import { logout, initializeUser } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
    dispatch(initializeUsers())
  }, [dispatch])

  const notification = useSelector(state => state.notification)
  const user = useSelector(state => state.user.user)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)
  const blogFormRef = React.createRef()

  const handleLogout = () => {
    dispatch(logout())
  }

  const createBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      await dispatch(addBlog(newBlog))
      dispatch(setNotification(`New blog "${newBlog.title}" by ${newBlog.author} added`, 'notification'))
      return true
    } catch (exception) {
      console.log('exception:', exception)
      dispatch(setNotification('Error: Both title and url are required', 'error'))
      return false
    }
  }

  const showLoginForm = () => (
    <Togglable buttonLabel="Log in" showCancel={true}>
      <LoginForm />
    </Togglable>
  )

  const showBlogForm = () => (
    <Togglable buttonLabel="New blog listing" showCancel={true} ref={blogFormRef}>
      <BlogForm createBlog={createBlog} />
    </Togglable>
  )

  const showLoggedUser = () => (
    <div><p>{user.name} ({user.username}) logged in<button onClick={() => handleLogout()}>Logout</button></p></div>
  )

  return (
    <Router>
      <div>
        <h2>Blogs</h2>
        <Notification text={notification.notificationText} type={notification.notificationType} />
        <Link to="/">Blogs</Link>
        <Link to="/users">Users</Link>
        {user === null
          ? showLoginForm()
          : showLoggedUser()
        }
        <Switch>
          <Route path="/blogs/:id">
            <Blog blogs={blogs} />
          </Route>
          <Route path="/users/:id">
            <User users={users} />
          </Route>
          <Route path="/users">
            {users ? <Users users={users} /> : null}
          </Route>
          <Route path="/">
            {user !== null
              ? showBlogForm()
              : <div>Kirjaudu niin näet lomakkeen</div>
            }
            <div>
              <BlogList />
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App