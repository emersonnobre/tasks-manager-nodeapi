const User = require('../models/User')

async function validates(user) {
    const errors = []
    const fields = Object.keys(user)
    const requiredFields = ['name', 'email', 'password']
    const missingFields = requiredFields.filter(required => !fields.includes(required))
    const complementaryFields = ['age']
    const invalidFields = fields.filter(field => !requiredFields.includes(field) && !complementaryFields.includes(field))
    const validationErrorsFromModel = await User.validate(user).then(() => null).catch(err => err)
    console.log('validation from model =', validationErrorsFromModel)
    if (!fields.length) errors.push('You must provide a user field with the properties within')
    if (missingFields.length) errors.push(`Missing fields: ${missingFields}`)
    if (invalidFields.length) errors.push(`Invalid fields for save: ${invalidFields}`)
    if (validationErrorsFromModel) errors.push(validationErrorsFromModel)
    return errors
}

async function validatesForUpdate(user) {
    const errors = []
    const fields = Object.keys(user)
    const acceptedFields = ['name', 'email', 'password', 'age']
    const invalidFields = fields.filter(field => !acceptedFields.includes(field))
    const validationErrorsFromModel = await User.validate(user).then(() => null).catch(err => err)
    if (!fields.length) errors.push('You must provide a user object with the properties within')
    if (invalidFields.length) errors.push(`Invalid fields for update: ${invalidFields}`)
    if (validationErrorsFromModel) errors.push(validationErrorsFromModel)
    return errors
}

module.exports = {
    validates,
    validatesForUpdate
}