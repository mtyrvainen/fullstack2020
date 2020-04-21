const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)

describe('when there already is a user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('password', 10)
    const user = new User({ username: 'admin', name: 'antti', passwordHash })

    await user.save()
  })

  test('success creating a new user with valid data', async () => {
    const usersInDb = await helper.usersInDb()

    const newUser = {
      username: 'mtyrvain',
      name: 'Marko Tyrväinen',
      password: 'notasecret'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAfterCreation = await helper.usersInDb()
    expect(usersAfterCreation).toHaveLength(usersInDb.length + 1)

    const usernames = usersAfterCreation.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('failure creating a new user with the same username as an existing one', async() => {
    const usersInDb = await helper.usersInDb()

    const newUser = {
      username: 'admin',
      name: 'Antti Admin',
      password: '2password2fast'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAfterCreation = await helper.usersInDb()
    expect(usersAfterCreation).toHaveLength(usersInDb.length)
  })

  test('failure creating a new user with username length of less than three characters', async() => {
    const usersInDb = await helper.usersInDb()

    const newUser = {
      username: 'te',
      name: 'Test Person',
      password: 'lengthypassword'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Path `username`')

    const usersAfterCreation = await helper.usersInDb()
    expect(usersAfterCreation).toHaveLength(usersInDb.length)
  })

  test('failure creating a new user with password length of less than three characters', async() => {
    const usersInDb = await helper.usersInDb()

    const newUser = {
      username: 'tester',
      name: 'Test Person'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password must be at least 3 characters long')

    const usersAfterCreation = await helper.usersInDb()
    expect(usersAfterCreation).toHaveLength(usersInDb.length)
  })

  test('failure creating a new user without name', async() => {
    const usersInDb = await helper.usersInDb()

    const newUser = {
      username: 'tester',
      password: 'somepassword'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Path `name` is required')

    const usersAfterCreation = await helper.usersInDb()
    expect(usersAfterCreation).toHaveLength(usersInDb.length)
  })

  test('failure creating a new user without username', async() => {
    const usersInDb = await helper.usersInDb()

    const newUser = {
      name: 'Test Person',
      password: 'somepassword'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Path `username` is required')

    const usersAfterCreation = await helper.usersInDb()
    expect(usersAfterCreation).toHaveLength(usersInDb.length)
  })

})

afterAll( () => {
  mongoose.connection.close()
})