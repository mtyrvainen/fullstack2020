import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationType, setNotificationType] = useState('')
  const [notificationText, setNotificationText] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)
  
  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const blogUserJSON = window.localStorage.getItem('blogUser')
    if (blogUserJSON) {
      const user = JSON.parse(blogUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const displayNotification = (text, type) => {
		setNotificationType(type)
		setNotificationText(text)
		setTimeout( () => {
			setNotificationText(null)
		}, 5000)
  }
  
  const createBlog = async (newBlog) => {
    try {
      const res = await blogService.create(newBlog)
      console.log('blogFormRef:', blogFormRef)
      blogFormRef.current.toggleVisibility()
      
      displayNotification(`New blog "${newBlog.title}" by ${newBlog.author} added`, 'notification')
      setBlogs(blogs.concat(res))
      return true
    } catch (exception) {
      console.log(exception)
      displayNotification('Error: Both title and url are required', 'error')  
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('loggin in:', username, password)
    try {
      if (username && password) {
        const user = await loginService.login({ username, password })
        
        window.localStorage.setItem('blogUser', JSON.stringify(user))
        blogService.setToken(user.token)
        setUser(user)
        setUsername('')
        setPassword('')
      } else {
        displayNotification('Error: Enter username and password', 'error')
      }
    } catch (exception) {
      displayNotification('Error: Wrong password or username', 'error')
    }
  }

  const handleLogout = (event) => {
    setUser(null)
    window.localStorage.clear()
    blogService.setToken(null)
  }

  const loginForm = () => {
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

  const blogForm = () => (
    <Togglable buttonLabel="New blog listing" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
  )
  
  return (
    <div>
      <h2>Blogs</h2>
      <Notification text={notificationText} type={notificationType} />
      {user === null
        ? loginForm()
        : <div>
          <p>Welcome {user.name} <button onClick={() => handleLogout()}>Logout</button></p>
            {blogForm()}    
          </div>
      }
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )
}

export default App