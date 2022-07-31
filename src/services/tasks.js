const Task = require('../models/Task')
const tasksValidator = require('../validators/tasks')
const errorWrapper = require('../util/error-wrapper')
const serviceResponse = require('../dto/service-response')
const { SUCCESS, CREATED, BADREQUEST, NOTFOUND, NOCONTENT } = require('../enum/status-code')

function get(filterObject, pagination) {
    return errorWrapper(async () => {
        const tasks = await Task.find(filterObject).limit(pagination.limit).skip(pagination.skip)
        return serviceResponse(SUCCESS, tasks)
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
        const currentTask = await Task.findOne({ _id: id, owner: incomingTask.owner })
        if (!currentTask) return serviceResponse(NOTFOUND, null)
        Object.keys(incomingTask).forEach(field => currentTask[field] = incomingTask[field])
        currentTask.save()
        return serviceResponse(NOCONTENT, null)
    })
}

function remove(id, owner) {
    return errorWrapper(async () => {
        const deletedTask = await Task.findOneAndDelete({ _id: id, owner })
        if (!deletedTask) return serviceResponse(NOTFOUND, null)
        return serviceResponse(NOCONTENT, null)
    })
}

module.exports = {
    get,
    save,
    update,
    remove
}