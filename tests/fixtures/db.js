const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const Car = require('../../src/models/car')

const normalUserId = new mongoose.Types.ObjectId();
const carId = new mongoose.Types.ObjectId();

const normalUserCar = {
    _id: carId,
    plate_number: "FUK123"
}

const normalUser = {
    _id: normalUserId,
    email: 'fuck@example.com',
    password: 'ExampleUser123!',
    tokens: [{
        token: jwt.sign({ _id: normalUserId }, process.env.JWT_SECRET)
    }],
    cars: normalUserCar
}


const setupDatabase = async () => {
    await User.deleteMany()
    await Car.deleteMany()
    await new Car(normalUserCar).save()
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