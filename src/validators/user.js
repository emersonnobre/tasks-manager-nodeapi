const User = require('../models/User')

async function validates(user) {
    let errors = []
    const fields = Object.keys(user)
    const requiredFields = ['name', 'email', 'password']
    const missingFields = requiredFields.filter(required => !fields.includes(required) || (fields.includes(required) && user[required] == ''))
    
    if (!fields.length) errors.push('You must provide a user field with the properties within')
    if (missingFields.length) errors = missingFields.map(field => `Missing field: ${field}`)
    
    return errors
}

async function validatesForUpdate(user) {
    const errors = []
    const fields = Object.keys(user)
    const acceptedFields = ['name', 'email', 'password', 'age']
    const invalidFields = fields.filter(field => !acceptedFields.includes(field))
    
    if (!fields.length) errors.push('You must provide a user object with the properties within')
    if (invalidFields.length) errors.push(`Invalid fields for update: ${invalidFields}`)
    
    return errors
}

module.exports = {
    validates,
    validatesForUpdate
}