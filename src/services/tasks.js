const Task = require('../models/Task')
const tasksValidator = require('../validators/tasks')
const errorWrapper = require('../util/errorWrapper')
const serviceResponse = require('../dto/service-response')
const { SUCCESS, CREATED, BADREQUEST, NOTFOUND, NOCONTENT } = require('../enum/status-code')

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
        const validationErrors = await tasksValidator.validates(task)
        if (validationErrors.length) return serviceResponse(BADREQUEST, null, validationErrors)
        const createdTask = await Task.create(task)
        return serviceResponse(CREATED, createdTask)
    }, serviceResponse)
}

function update(id, incomingTask = {}) {
    return errorWrapper(async () => {
        const validationErrors = await tasksValidator.validatesForUpdate(incomingTask)
        if (validationErrors.length) return serviceResponse(BADREQUEST, null, validationErrors)
        const currentTask = await Task.findById(id)
        if (!currentTask) return serviceResponse(NOTFOUND, null)
        Object.keys(incomingTask).forEach(field => currentTask[field] = incomingTask[field])
        currentTask.save()
        return serviceResponse(NOCONTENT, null)
    })
}

function remove(id) {
    return errorWrapper(async () => {
        const deletedTask = await Task.findByIdAndDelete(id)
        if (!deletedTask) return serviceResponse(NOTFOUND, null)
        return serviceResponse(SUCCESS, null)
    })
}

module.exports = {
    get,
    getById,
    save,
    update,
    remove
}