const express = require('express')
const { get, getById, save } = require('../services/user-service')

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

module.exports = router