/* eslint-disable no-undef */
require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URL

module.exports = {
    PORT,
    MONGODB_URI
}