import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  let likedBlog
  let updatedBlog
  let commentedBlog

  switch(action.type) {
  case 'LIKE':
    likedBlog = state.find(blog => blog.id === action.id)
    updatedBlog = {
      ...likedBlog,
      likes: likedBlog.likes + 1
    }
    return state.map(blog => blog.id !== action.id ? blog : updatedBlog)
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
  case 'REMOVE_BLOG':
    return state.filter(blog => blog.id !== action.id)
  case 'ADD_COMMENT':
    commentedBlog = state.find(blog => blog.id === action.id)
    updatedBlog = {
      ...commentedBlog,
      comments: commentedBlog.comments.concat(action.comment)
    }
    return state.map(blog => blog.id !== action.id ? blog : updatedBlog)
  default:
    return state
  }
}

export const likeId = (id) => {
  return async dispatch => {
    const updatedBlog = await blogService.updateLikes(id)
    await dispatch({
      type: 'LIKE',
      id: updatedBlog.id
    })
  }
}

export const addBlog = (data) => {
  return async dispatch => {
    const res = await blogService.add(data)
    await dispatch({
      type: 'NEW_BLOG',
      data: res
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    await dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    await blogService.remove(blog)
    await dispatch({
      type: 'REMOVE_BLOG',
      id: blog.id
    })
  }
}

export const addComment = (data) => {
  return async dispatch => {
    await blogService.addComment(data.id, data.comment)
    await dispatch({
      type: 'ADD_COMMENT',
      id: data.id,
      comment: data.comment.comment
    })
  }
}

export default blogReducer