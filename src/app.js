const express = require('express')
const cors = require('cors')
const userRouter = require('./routes/user')
const carRouter = require('./routes/car')

require('./db/mongoose')

const app = express()

app.use(express.json())
app.use(cors())
app.use('/v1', userRouter)
app.use('/v1', carRouter)

module.exports = app