import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = tokenString => {
  token = `bearer ${tokenString}`
  console.log('Token set:', token)
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

export default { getAll, create, setToken }