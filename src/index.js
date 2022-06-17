require('dotenv').config()
const express = require('express')
const connectDB = require('./db/connect')
const tasksRoutes = require('./routes/tasks-routes')
const userRoutes = require('./routes/user-routes')
const notFound = require('./middleware/not-found')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.static('public'))
app.use('/api/v1/tasks', tasksRoutes)
app.use('/api/v1/user', userRoutes)
app.use(notFound)

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