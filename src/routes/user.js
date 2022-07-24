const express = require('express')
const { get, getById, save, update } = require('../services/user')

const router = express.Router()

router.route('/')
    .get(async (req, res) => {
        const response = await get({})
        return res.status(response.statusCode).json(response)
    })
    .post(async (req, res) => {
        const { user } = req.body
        const response = await save(user)
        return res.status(response.statusCode).json(response)
    })

router.route('/:id')
    .get(async (req, res) => {
        const { id } = req.params
        const response = await getById(id)
        return res.status(response.statusCode).json(response)
    })
    .patch(async (req, res) => {
        const { id } = req.params
        const { user } = req.body
        const response = await update(id, user)
        return res.status(response.statusCode).json(response)
    })

module.exports = router