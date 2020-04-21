const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jsonwebtoken = require('jsonwebtoken')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 } )
  res.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (req, res) => {
  const body = req.body

  // eslint-disable-next-line no-undef
  const verifiedToken = jsonwebtoken.verify(req.token, process.env.SECRET)
  if (!req.token || !verifiedToken.id) {
    return res.status(401).json( { error: 'invalid or missing token' } )
  }

  const user = await User.findById(verifiedToken.id)

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await newBlog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  res.json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (req, res) => {
  if (!req.token) {
    return res.status(401).json( { error: 'invalid or missing token' } )
  }

  // eslint-disable-next-line no-undef
  const verifiedToken = jsonwebtoken.verify(req.token, process.env.SECRET)
  if (!verifiedToken.id) {
    return res.status(401).json( { error: 'invalid or missing token' } )
  }

  const user = await User.findById(verifiedToken.id)
  const blog = await Blog.findById(req.params.id)

  if (blog.user.toString() !== user.id.toString()) {
    return res.status(401).json( { error: 'Unauthorized to delete content' } )
  }

  await Blog.findByIdAndDelete(req.params.id)
  await User.findByIdAndUpdate(verifiedToken.id, { blogs: user.blogs.filter(id => id.toString() !== req.params.id) })
  /*await user.save()*/

  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const body = req.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true, runValidators: true, context: 'query' } ).populate('user', { username: 1, name: 1 } )
  res.json(updatedBlog.toJSON())
})

module.exports = blogsRouter