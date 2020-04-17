const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 } )
    res.json(users.map(user => user.toJSON()))
})

usersRouter.post('/', async (req, res) => {
    const body = req.body

    if (!body.password || body.password.length < 3) {
        res.status(400).json({ error: 'password must be at least 3 characters long' }).end()
    } else {
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash: passwordHash
        })

        const newUser = await user.save()

        res.json(newUser)
    }
})

module.exports = usersRouter