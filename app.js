const {connectDB} = require('./db/connect')
const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
require('dotenv').config()
const { notFound } = require('./middleware/not-found')
const { errorHandlerMiddleware } = require('./middleware/error-handler')

const port = process.env.PORT || 3000

// middlewares
app.use(express.json())
app.use(express.static('public'))
app.use('/api/v1/tasks', tasks)
app.use(notFound)
app.use(errorHandlerMiddleware)


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI).then(() => console.log('connected to the db!')).catch(err => console.log(err))
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    } catch(error) {
        console.log(error)
    }
}

start()

// parei em...