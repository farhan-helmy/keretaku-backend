require("../db/mongoose")

const User = require("../models/user")
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose')

const normalUserId = new mongoose.Types.ObjectId();

const normalUser = {
    _id: normalUserId,
    email: 'farhan@mybengkel.co',
    password: 'ExampleUser123!',
    tokens: [{
        token: jwt.sign({ _id: normalUserId }, process.env.JWT_SECRET)
    }]
}

const seed = async () => {
    await User.deleteMany()
    const user = await new User(normalUser).save()
    console.log("Done seed user " + user.email + "!😁")
    process.exit(1)
}

seed()