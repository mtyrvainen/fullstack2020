const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let sum = 0

    if (blogs.lenth !== 0) {
        blogs.map(blog => sum += Number(blog.likes))
    }

    return sum
}

const favoriteBlog = (blogs) => {
    let favoriteBlog = {}
    let topLikes = 0

    if (blogs.length !== 0) {
        blogs.map(blog => {
            if (Number(blog.likes) >= topLikes) {
                favoriteBlog = blog
                topLikes = Number(blog.likes)
            }
        })
        return { title: favoriteBlog.title, author: favoriteBlog.author, likes: favoriteBlog.likes }
    }
    return null
}

const mostBlogs = (blogs) => {
    if (blogs.length !== 0) {
        let byAuthor = lodash.countBy(blogs, blog => blog.author)
        let topValue = 0

        lodash.forEach(byAuthor, value => {
            if (value > topValue) topValue = value
        })

        return { author: lodash.invert(byAuthor)[topValue], blogs: topValue }
    }

    return null
}

const mostLikes = (blogs) => {
    if (blogs.length !== 0) {
        let likes = {}
        let topValue = 0

        blogs.forEach(blog => {
            if (likes[blog.author]) {
                likes[blog.author] = likes[blog.author] + blog.likes
            } else {
                likes[blog.author] = blog.likes
            }
        })
        console.log('likes:', likes)
        lodash.forEach(likes, value => {
            if (value > topValue) topValue = value
        })

        return { author: lodash.invert(likes)[topValue], likes: topValue }
    }

    return null
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}