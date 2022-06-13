const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const Car = require('../../src/models/car')
const {
    nanoid
} = require("nanoid");

const normalUserId = nanoid(5)
const normalUser = {
    _id: normalUserId,
    email: 'farhan@example.com',
    password: 'ExampleUser123!',
    tokens: [{
        token: jwt.sign({ _id: normalUserId }, process.env.JWT_SECRET)
    }]
}

const setupDatabase = async () => {
    await User.deleteMany()
    await Car.deleteMany()
    await new User(normalUser).save()
}

const resetDatabase = async () => {
    mongoose.connection.close()
}

module.exports = {
    normalUserId,
    normalUser,
    setupDatabase,
    resetDatabase
}