require('dotenv').config()
const express = require('express')
const connectDB = require('./db/connect')
const tasksRoutes = require('./routes/tasks')
const userRoutes = require('./routes/user')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.static('public'))
app.use('/api/v1/tasks', tasksRoutes)
app.use('/api/v1/user', userRoutes)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        console.log('connected to the db!')
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    } catch(error) {
        console.log(error)
    }
}

start()