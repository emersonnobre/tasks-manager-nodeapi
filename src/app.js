const express = require('express')
const tasksRoutes = require('./routes/tasks')
const userRoutes = require('./routes/user')

const app = express()

app.use(express.json())
app.use(express.static('public'))

app.use('/api/v1/tasks', tasksRoutes)
app.use('/api/v1/user', userRoutes)

module.exports = app