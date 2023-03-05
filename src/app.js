const express = require('express')
const connect = require('./db/connect')
const tasksRoutes = require('./routes/tasks')
const userRoutes = require('./routes/user')

connect().then(() => console.log('connected to database'))

const app = express()

app.use(express.json())
app.use(express.static('public'))

app.use('/api/v1/tasks', tasksRoutes)
app.use('/api/v1/user', userRoutes)

module.exports = app