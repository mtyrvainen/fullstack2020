const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'Games',
        author: 'Games  McGamerson',
        url: 'www.games.com/gamegame',
        likes: 0
    },
    {
        title: 'Books',
        author: 'Bookie O\'Readerson',
        url: 'www.books.com/book/39',
        likes: 7
    },
    {
        title: 'Movies',
        author: 'Movie von Screen',
        url: 'www.books.com/goodonesonly',
        likes: 3
    }
]

const initializedUsers = async () => {
    const passwordHash1 = await bcrypt.hash('password1', 10)
    const passwordHash2 = await bcrypt.hash('password2', 10)
    return [
        { username: 'tester1', name: 'antti', passwordHash: passwordHash1 },
        { username: 'tester2', name: 'kantti', passwordHash: passwordHash2 }
    ]
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

const nonExistingId = async () => {
    const blog = new Blog( { title: 'temp' } )
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

module.exports = {
    initialBlogs, blogsInDb, nonExistingId, usersInDb, initializedUsers
}