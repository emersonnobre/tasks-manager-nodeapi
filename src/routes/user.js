const express = require('express')
const { get, save, update, login, updateAvatar, getAvatar } = require('../services/user')
const authentication = require('../middleware/authentication')
const upload = require('../middleware/multer')

const router = express.Router()

router.get('/', authentication, async (_, res) => {
    const response = await get({})
    res.status(response.statusCode).json(response)
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const response = await login(email, password)
    res.status(response.statusCode).json(response)
})

router.post('/signup', async (req, res) => {
    const { user } = req.body
    const response = await save(user)
    res.status(response.statusCode).json(response)
})

router.route('/me')
    .get(authentication, (req, res) => {
        res.send(req.user)
    })
    .patch(authentication, async (req, res) => {
        const { user } = req.body
        const response = await update(req.user._id, user)
        res.status(response.statusCode).json(response)
    })

router.route('/me/avatar')
    .post(authentication, upload.single('avatar'), async (req, res) => {
        const avatarBuffer = req.file.buffer
        const response = await updateAvatar(req.user._id, avatarBuffer)
        res.status(response.statusCode).json(response)
    }, (error, _req, res, _next) => {
        res.status(400).json({ error: error.message})
    })
    .get(authentication, async (req, res) => {
        res.set('Content-Type', 'image/jpg')
        const response = await getAvatar(req.user._id)
        res.status(response.statusCode).send(response.data)
    })

module.exports = router