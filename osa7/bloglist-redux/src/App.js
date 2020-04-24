import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, likeId, addBlog, removeBlog } from './reducers/blogReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)
  const blogFormRef = React.createRef()

  useEffect(() => {
    const blogUserJSON = window.localStorage.getItem('blogUser')
    if (blogUserJSON) {
      const user = JSON.parse(blogUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const displayNotification = (text, type) => {
    dispatch(setNotification(text, type))
  }

  const createBlog = async (newBlog) => {
    try {
      dispatch(addBlog(newBlog))
      blogFormRef.current.toggleVisibility()
      displayNotification(`New blog "${newBlog.title}" by ${newBlog.author} added`, 'notification')
      return true
    } catch (exception) {
      displayNotification('Error: Both title and url are required', 'error')
      return false
    }
  }

  const handleLikes = async (blog) => {
    try {
      dispatch(likeId(blog.id))
      displayNotification(`Blog "${blog.title}" updated +1 like`, 'notification')
    } catch (exception) {
      displayNotification('Error: couldn\'t register like', 'error')
    }
  }

  const deleteBlog = async (blogToRemove) => {
    if (!window.confirm(`Remove blog "${blogToRemove.title}" by ${blogToRemove.author}?`)) {
      return
    }

    try {
      dispatch(removeBlog(blogToRemove))
      displayNotification(`Blog "${blogToRemove.title}" removed`, 'notification')
    } catch (exception) {
      displayNotification('Error: removing blog', 'error')
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      if (username && password) {
        const user = await loginService.login({ username, password })

        window.localStorage.setItem('blogUser', JSON.stringify(user))
        blogService.setToken(user.token)
        setUser(user)
        setUsername('')
        setPassword('')
        setLoginVisible(false)
      } else {
        displayNotification('Error: Enter username and password', 'error')
      }
    } catch (exception) {
      displayNotification('Error: Wrong password or username', 'error')
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
    blogService.setToken(null)
  }

  const showLoginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>Log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>Cancel</button>
        </div>
      </div>
    )
  }

  const showBlogForm = () => (
    <Togglable buttonLabel="New blog listing" showCancel={true} ref={blogFormRef}>
      <BlogForm createBlog={createBlog} />
    </Togglable>
  )

  return (
    <div>
      <h2>Blogs</h2>
      <Notification text={notification.notificationText} type={notification.notificationType} />
      {user === null
        ? showLoginForm()
        : <div>
          <p>Welcome {user.name} <button onClick={() => handleLogout()}>Logout</button></p>
          {showBlogForm()}
        </div>
      }
      <div>
        {blogs.sort((blog1, blog2) => blog2.likes - blog1.likes).map(blog =>
          <Blog key={blog.id} blog={blog} handleLikes={handleLikes} removeBlog={deleteBlog} loggedUser={user} />
        )}
      </div>
    </div>
  )
}

export default App