const Task = require("../models/Task")

async function validates(task) {
    const errors = []
    const fields = Object.keys(task)
    const requiredFields = ['name']
    const missingFields = requiredFields.filter(required => !fields.includes(required))
    const complementaryFields = ['completed']
    const invalidFields = fields.filter(field => !requiredFields.includes(field) && !complementaryFields.includes(field))
    const validationErrorsFromModel = await Task.validate(task).then(() => null).catch(err => err)
    if (!fields.length) errors.push('You must provide a task field with the properties within')
    if (missingFields.length) errors.push(`Missing fields: ${missingFields}`)
    if (invalidFields.length) errors.push(`Invalid fields for save: ${invalidFields}`)
    if (validationErrorsFromModel) errors.push(validationErrorsFromModel)
    return errors
}

async function validatesForUpdate(task) {
    const errors = []
    const fields = Object.keys(task)
    const acceptedFields = ['name', 'completed']
    const invalidFields = fields.filter(field => !acceptedFields.includes(field))
    const validationErrorsFromModel = await Task.validate(task).then(() => null).catch(err => err)
    if (!fields.length) errors.push('You must provide a task object with the properties within')
    if (invalidFields.length) errors.push(`Invalid fields for update: ${invalidFields}`)
    if (validationErrorsFromModel) errors.push(validationErrorsFromModel)
    return errors
}

module.exports = {
    validates,
    validatesForUpdate,
}