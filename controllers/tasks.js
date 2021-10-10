const Task = require('../models/Task')
const { asyncWrapper } = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')

const getAllTasks = asyncWrapper(async (req, res) => {
    const allTasks = await Task.find({})
    res.status(200).json({ allTasks })
})

const createTask = asyncWrapper(async (req, res) => {
    const newTask = await Task.create(req.body)
    res.status(201).json({ newTask })
})

const getTask = asyncWrapper(async (req, res, next) => {
    const {id: taskID} = req.params
    const task = await Task.findOne({ _id: taskID })

    if(!task) {
        return next(createCustomError(`No task with id: ${taskID}`, 404))
    }
    res.status(200).json({ task })
})

const updateTask = asyncWrapper(async (req, res) => {
    const {id: taskID} = req.params
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true,
        runValidators: true
    })

    if(!task) {
        return next(createCustomError(`No task with id: ${taskID}`, 404))
    }

    res.status(200).json({ task })
}) 

const deleteTask = asyncWrapper(async (req, res) => {
    const {id: taskID} = req.params
    const task = await Task.deleteOne({ _id: taskID })
    
    if(!task) {
        return next(createCustomError(`No task with id: ${taskID}`, 404))
    }

    res.status(200).json({ task })
})

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}