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
        test('success 204 response with valid id', async () => {
        })
    })

    describe('updating of blogs', () => {
        test('success with valid data', async () => {
        })

        test('4xx  with invalid data', async () => {
        })
    })
})

afterAll( () => {
    mongoose.connection.close()
})