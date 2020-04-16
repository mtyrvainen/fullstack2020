const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

describe('when there is initial data in DB', () => {

    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)
    })

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('a specific blog is in the returned blogs', async () => {
        const response = await api.get('/api/blogs')
        const titles = response.body.map(r => r.title)

        expect(titles).toContain('Games')
    })

    test('blog object id field is named \'id\' instead of \'_id\'', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body[0].id).toBeDefined()
    })

    describe('adding new blogs', () => {
        test('success with valid data', async () => {
            const newBlog = {
                title: 'Created in testing',
                author: 'Test author',
                url: 'www.test.com/test',
                likes: 9
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            const blogsInDb = await helper.blogsInDb()
            expect(blogsInDb).toHaveLength(helper.initialBlogs.length + 1)

            const titles = blogsInDb.map(blog => blog.title)
            expect(titles).toContain('Created in testing')
        })

        test('blog\'s likes is set to zero if it\'s not given during creation', async () => {
            const newBlog = {
                title: 'Created in testing',
                author: 'Test author',
                url: 'www.test.com/test'
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            const blogsInDb = await helper.blogsInDb()
            const createdBlog = blogsInDb.filter(blog => blog.title.toString() === 'Created in testing')
            expect(createdBlog[0].likes).toBe(0)
        })

        test('a blog created without title and/or url results in 400 Bad Request response', async () => {
            let newBlog = {
                title: 'Created in testing',
                author: 'Test author',
                likes: 1
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(400)

            newBlog = {
                author: 'Test author',
                url: 'www.test.com/test',
                likes: 1
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(400)

        })
    })

    describe('deletion of blogs', () => {
        test('success 204 response with valid id, amount of blogs in db goes down by one', async () => {
            const blogsInDb = await helper.blogsInDb()
            await api.delete('/api/blogs/' + blogsInDb[0].id)
                .expect(204)

            const blogsAfterDelete = await helper.blogsInDb()
            expect(blogsAfterDelete).toHaveLength(blogsInDb.length - 1)
        })
    })

    describe('updating of blogs', () => {
        test('success with valid data and id, also data is updated', async () => {
            const blogsInDb = await helper.blogsInDb()

            let updateBlog = {
                title: 'Games - updated',
                author: 'Games  McGamerson',
                url: 'www.games.com/gamegame',
                likes: 29,
                id: blogsInDb[0].id
            }

            await api
                .put('/api/blogs/' + blogsInDb[0].id)
                .send(updateBlog)
                .expect(200)

            const updatedBlogsInDb = await helper.blogsInDb()
            const updatedBlog = updatedBlogsInDb.filter(blog => blog.id === blogsInDb[0].id)[0]
            expect(updatedBlog.title).toBe('Games - updated')
            expect(updatedBlog.likes).toBe(29)
        })

        test('400 with missing title and/or url but valid id', async () => {
            const blogsInDb = await helper.blogsInDb()

            let updateBlog = {
                author: 'Games  McGamerson',
                url: 'www.games.com/gamegame',
                likes: 29,
                id: blogsInDb[0].id
            }

            await api
                .put('/api/blogs/' + blogsInDb[0].id)
                .send(updateBlog)
                .expect(400)

            updateBlog = {
                title: 'Games - updated',
                author: 'Games  McGamerson',
                likes: 29,
                id: blogsInDb[0].id
            }

            await api
                .put('/api/blogs/' + blogsInDb[0].id)
                .send(updateBlog)
                .expect(400)
        })
    })
})

afterAll( () => {
    mongoose.connection.close()
})