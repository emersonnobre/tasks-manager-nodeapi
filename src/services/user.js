const User = require('../models/User')
const errorWrapper = require('../util/errorWrapper')
const serviceResponse = require('../dto/service-response')
const { SUCCESS, CREATED, NOCONTENT, BADREQUEST, NOTFOUND } = require('../enum/status-code')

function get(filterObject) {
    return errorWrapper(async() => {
        const users = await User.find(filterObject)
        return serviceResponse(SUCCESS, users)
    }, serviceResponse)
}

function getById(id) {
    return errorWrapper(async() => {
        const user = await User.findById(id)
        if (!user) return serviceResponse(NOTFOUND, null)
        return serviceResponse(SUCCESS, user)
    }, serviceResponse)
} 

function save(user = {}) {
    return errorWrapper(async() => {
        const validationErrors = await User.validate(user).then(() => null).catch(err => err)
        if (validationErrors) return serviceResponse(BADREQUEST, null, validationErrors)
        const newUser = await User.create(user)
        return serviceResponse(CREATED, newUser)
    }, serviceResponse)
}

function update(id, newUser = {}) {
    return errorWrapper(async() => {
        const user = await User.findById(id)
        if (!user) return serviceResponse(NOTFOUND, null)
        const fields = Object.keys(newUser)
        fields.forEach(field => user[field] = newUser[field])
        const validationErrors = await User.validate(user).then(() => null).catch(err => err)
        if (validationErrors) return serviceResponse(BADREQUEST, null, validationErrors)
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