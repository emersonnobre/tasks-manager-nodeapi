const User = require('../models/User')
const userMapper = require('../models/mappers/user')
const userValidator = require('../validators/user')
const authService = require('./authentication')
const errorWrapper = require('../util/error-wrapper')
const serviceResponse = require('../dto/service-response')
const { SUCCESS, CREATED, NOCONTENT, BADREQUEST, UNAUTHORIZED, NOTFOUND } = require('../enum/status-code')

function get(filterObject) {
    return errorWrapper(async () => {
        const users = await User.find(filterObject)
        const mappedUsers = users.map(userMapper.mapToResponse)
        return serviceResponse(SUCCESS, mappedUsers)
    }, serviceResponse)
}

function getById(id) {
    return errorWrapper(async () => {
        const user = await User.findById(id)
        if (!user) return serviceResponse(NOTFOUND, null)
        return serviceResponse(SUCCESS, userMapper.mapToResponse(user))
    }, serviceResponse)
} 

function save(user = {}) {
    return errorWrapper(async () => {
        const validationErrors = await userValidator.validates(user)
        if (validationErrors.length) return serviceResponse(BADREQUEST, null, validationErrors)
        const newUser = await User.create(user)
        const token = authService.createNewToken({ _id: newUser._id.toString() })
        return serviceResponse(CREATED, { token })
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

function login(email, password) {
    return errorWrapper(async () => {
        if (!email || !password) return serviceResponse(BADREQUEST, null, 'You must provide an e-mail and password')
        const loggedUser = await User.findByEmailAndPassword(email, password);
        if (!loggedUser) return serviceResponse(UNAUTHORIZED, null, 'Unable to login')
        const token = authService.createNewToken({ _id: loggedUser._id.toString() })
        return serviceResponse(SUCCESS, { token })
    }, serviceResponse)
}

module.exports = {
    get,
    getById,
    save,
    update,
    login,
}