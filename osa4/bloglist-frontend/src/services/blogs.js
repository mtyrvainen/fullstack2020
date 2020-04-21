import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = tokenString => {
  token = `bearer ${tokenString}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlogObject => {
  const config = {
    headers: { Authorization: token }
  }
  const res = await axios.post(baseUrl, newBlogObject, config)
  return res.data
}

const update = async (upDatedBlogObject) => {
  const res = await axios.put(baseUrl + `/${upDatedBlogObject.id}`, upDatedBlogObject)
  return res.data
}

const remove = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }
  const res = await axios.delete(baseUrl + `/${blog.id}`, config)
  return res.data
}

export default { getAll, create, setToken, update, remove }