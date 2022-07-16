const express = require('express')
const cors = require('cors')
const userRouter = require('./routes/user')
const carRouter = require('./routes/car')
const healthCheckRouter = require('./routes/health-check')

require('./db/mongoose')

const app = express()

app.use(express.json())
app.use(cors())
app.use('/v1', userRouter)
app.use('/v1', carRouter)
app.use('/v1', healthCheckRouter)

module.exports = app