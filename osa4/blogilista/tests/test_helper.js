const Blog = require('../models/blog')

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

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const nonExistingId = async () => {
    const blog = new Blog( { title: 'temp' } )
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

module.exports = {
    initialBlogs, blogsInDb, nonExistingId
}