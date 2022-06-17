const User = require('../models/User')
const errorWrapper = require('../util/errorWrapper')
const serviceResponse = require('../dto/serviceResponse')
const { SUCCESS, CREATED, BADREQUEST, NOTFOUND } = require('../enum/statusCode-enum')

function validates(user) {
    const errors = []
    const requiredFields = ['name', 'email', 'password']
    const fields = Object.keys(user)
    const missingFields = requiredFields.filter(required => !fields.includes(required))
    if (missingFields.length) errors.push(`Missing fields: ${missingFields}`)
    else if (user.age && user.age < 0) errors.push('Age must be a positive number')
    return errors
}

function get(filterObject) {
    return errorWrapper(async () => {
        const users = await User.find(filterObject)
        return serviceResponse(SUCCESS, users)
    }, serviceResponse)
}

function getById(id) {
    return errorWrapper(async () => {
        const user = await User.findById(id)
        if (!user) return serviceResponse(NOTFOUND, null)
        return serviceResponse(SUCCESS, user)
    }, serviceResponse)
} 

function save(user = {}) {
    return errorWrapper(async () => {
        const validationErrors = validates(user)
        if (validationErrors.length) return serviceResponse(BADREQUEST, null, validationErrors)
        const newUser = await User.create(user)
        return serviceResponse(CREATED, newUser)
    }, serviceResponse)
}

module.exports = {
    get,
    getById,
    save,
}