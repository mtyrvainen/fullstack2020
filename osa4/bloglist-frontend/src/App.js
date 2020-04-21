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
    setNotificationText(text)
    setNotificationType(type)
    setTimeout( () => {
      setNotificationText(null)
    }, 5000)
  }

  const createBlog = async (newBlog) => {
    try {
      const res = await blogService.create(newBlog)
      blogFormRef.current.toggleVisibility()
      displayNotification(`New blog "${newBlog.title}" by ${newBlog.author} added`, 'notification')

      const blogWithUser = { ...res, user: { username: user.username, name: user.name } }
      setBlogs(blogs.concat(blogWithUser))

      return true
    } catch (exception) {
      displayNotification('Error: Both title and url are required', 'error')
      return false
    }
  }

  const handleLikes = async (blog) => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      id: blog.id
    }

    try {
      const res = await blogService.update(updatedBlog)

      let currentBlogs = [ ...blogs ]
      let index = currentBlogs.findIndex(b => b.id === res.id)
      currentBlogs[index] = res

      setBlogs(currentBlogs)
      displayNotification(`Blog "${res.title}" updated +1 like`, 'notification')
    } catch (exception) {
      displayNotification('Error: Both title and url are required', 'error')
    }
  }

  const removeBlog = async (removeBlog) => {
    if (!window.confirm(`Remove blog "${removeBlog.title}" by ${removeBlog.author}?`)) {
      return
    }

    try {
      await blogService.remove(removeBlog)

      setBlogs(blogs.filter(blog => blog.id !== removeBlog.id))
      displayNotification(`Blog "${removeBlog.title}" removed`, 'notification')
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
      {notificationText && <Notification text={notificationText} type={notificationType} />}
      {user === null
        ? showLoginForm()
        : <div>
          <p>Welcome {user.name} <button onClick={() => handleLogout()}>Logout</button></p>
          {showBlogForm()}
        </div>
      }
      <div>
        {blogs.sort((blog1, blog2) => blog2.likes - blog1.likes).map(blog =>
          <Blog key={blog.id} blog={blog} handleLikes={handleLikes} removeBlog={removeBlog} loggedUser={user} />
        )}
      </div>
    </div>
  )
}

export default App