const express = require('express')
const { get, save, update, login } = require('../services/user')
const authentication = require('../middleware/authentication')

const router = express.Router()

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const response = await login(email, password)
    return res.status(response.statusCode).json(response)
})

router.route('/')
    .get(authentication, async (_, res) => {
        const response = await get({})
        return res.status(response.statusCode).json(response)
    })
    .post(async (req, res) => {
        const { user } = req.body
        const response = await save(user)
        return res.status(response.statusCode).json(response)
    })

router.get('/me', authentication, (req, res) => {
    res.send(req.user)
})

router.route('/me')
    .patch(authentication, async (req, res) => {
        const { user } = req.body
        const response = await update(req.user._id, user)
        return res.status(response.statusCode).json(response)
    })


module.exports = router