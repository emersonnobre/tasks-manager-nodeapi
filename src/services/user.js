const User = require('../models/User')
const userValidator = require('../validators/user')
const errorWrapper = require('../util/errorWrapper')
const serviceResponse = require('../dto/service-response')
const { SUCCESS, CREATED, NOCONTENT, BADREQUEST, NOTFOUND } = require('../enum/status-code')

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
        const validationErrors = await userValidator.validates(user)
        if (validationErrors.length) return serviceResponse(BADREQUEST, null, validationErrors)
        console.log('passou validacao')
        const newUser = await User.create(user)
        return serviceResponse(CREATED, newUser)
    }, serviceResponse)
}

function update(id, newUser = {}) {
    return errorWrapper(async () => {
        const validationErrors = await userValidator.validatesForUpdate(newUser)
        if (validationErrors.length) return serviceResponse(BADREQUEST, null, validationErrors)
        const user = await User.findById(id)
        if (!user) return serviceResponse(NOTFOUND, null)
        const fields = Object.keys(newUser)
        fields.forEach(field => user[field] = newUser[field])
        await user.save()
        return serviceResponse(NOCONTENT, null)
    }, serviceResponse)
}

module.exports = {
    get,
    getById,
    save,
    update,
}