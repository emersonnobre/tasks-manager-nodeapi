const Task = require('../models/Task')
const errorWrapper = require('../util/errorWrapper')
const serviceResponse = require('../dto/serviceResponse')
const { SUCCESS, CREATED, BADREQUEST, NOTFOUND, INTERNAL_SERVER_ERROR } = require('../enum/statusCode-enum')

function validates(task) {
    const errors = []
    if (!task.name) errors.push('You must provide the task name')
    return errors
}

function get(filterObject) {
    return errorWrapper(async () => {
        const tasks = await Task.find(filterObject)
        return serviceResponse(SUCCESS, tasks)
    }, serviceResponse)
}

function getById(id) {
    return errorWrapper(async () => {
        const task = await Task.findById(id)
        if (!task) return serviceResponse(NOTFOUND, null)
        return serviceResponse(SUCCESS, task)
    }, serviceResponse)
} 

function save(task = {}) {
    return errorWrapper(async () => {
        const validationErrors = validates(task)
        if (validationErrors.length) return serviceResponse(BADREQUEST, null, validationErrors)
        const data = await Task.create(task)
        return serviceResponse(CREATED, data)
    }, serviceResponse)
}

function update(id, task = {}) {
    return errorWrapper(async () => {
        const updatedTask = Task.findByIdAndUpdate(id, task, { new: true, runValidators: true })
        
    })
}

module.exports = {
    get,
    getById,
    save,
}