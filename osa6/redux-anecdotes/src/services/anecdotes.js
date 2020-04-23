import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const add = async (content) => {
  const object = { content, votes: 0 }
  const res = await axios.post(baseUrl, object)
  return res.data
}

const updateVotes = async (id) => {
  const res = await axios.get(baseUrl + '/' + id)
  const updatedRes = await axios.put(baseUrl + '/' + id, { ...res.data, votes: res.data.votes + 1 })
  return updatedRes.data
}

export default { getAll, add, updateVotes }