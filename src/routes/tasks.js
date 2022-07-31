const express = require('express')
const { get, save, update, remove } = require('../services/tasks')
const authentication = require('../middleware/authentication')

const router = express.Router()

router.route('/')
    .get(authentication, async (req, res) => {
        const response = await get({ owner: req.user._id })
        return res.status(response.statusCode).json(response)
    })
    .post(authentication, async (req, res) => {
        const { task } = req.body
        const response = await save({ ...task, owner: req.user._id })
        return res.status(response.statusCode).json(response)
    })

router.route('/:id')
    .get(authentication, async (req, res) => {
        const { id } = req.params
        const response = await get({ _id: id, owner: req.user._id })
        return res.status(response.statusCode).json(response)
    })
    .patch(authentication, async (req, res) => {
        const { id } = req.params
        const { task } = req.body
        const response = await update(id, { ...task, owner: req.user._id })
        return res.status(response.statusCode).json(response)
    })
    .delete(authentication, async (req, res) => {
        const { id } = req.params
        const response = await remove(id, req.user._id)
        return res.status(response.statusCode).json(response)
    })

module.exports = router