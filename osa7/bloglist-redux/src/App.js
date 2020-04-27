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

//Material UI imports:
import { makeStyles } from '@material-ui/core/styles'
import { Box, Container, AppBar, Toolbar, Button, Typography } from '@material-ui/core'

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
    dispatch(setNotification('Logged out', 'notification'))
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
    <Box component="span" display="block" bgcolor="background.paper" p={2}>
      <Togglable buttonLabel="Log in" showCancel={true}>
        <LoginForm />
      </Togglable>
    </Box>
  )

  const showBlogForm = () => (
    <Box component="span" display="block" bgcolor="background.paper" p={2}>
      <Togglable buttonLabel="Add blog" showCancel={true} ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
    </Box>
  )



  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }))

  const classes = useStyles()

  return (
    <Container>
      <Router>
        <div>
          <Typography variant="h2">Project Blogs Redux</Typography>
          <div className={classes.root}>
            <AppBar color="primary" position="static">
              <Toolbar>
                <Button edge="start" color="inherit" component={Link} to="/">Blogs</Button>
                <Button color="inherit" component={Link} to="/users">Users</Button>
                <Typography color="primary" className={classes.title}></Typography>
                {user !== null
                  ? <Typography >{user.name} logged in</Typography>
                  : null
                }
                {user !== null
                  ? <Button size="small" variant="contained" color="secondary" onClick={() => handleLogout()}>Logout</Button>
                  : null
                }
              </Toolbar>

            </AppBar>
          </div>
          <Notification text={notification.notificationText} type={notification.notificationType} />

          {!user && showLoginForm()}
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
                : null
              }
              <div>
                <BlogList />
              </div>
            </Route>
          </Switch>
        </div>
      </Router>
    </Container>
  )
}

export default App