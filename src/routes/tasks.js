const express = require('express')
const { get, getById, save, update, remove } = require('../services/tasks')

const router = express.Router()

router.route('/')
    .get(async (req, res) => {
        const response = await get({})
        return res.status(response.statusCode).json(response)
    })
    .post(async (req, res) => {
        const { task } = req.body
        const response = await save(task)
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
        const { task } = req.body
        const response = await update(id, task)
        return res.status(response.statusCode).json(response)
    })
    .delete(async (req, res) => {
        const { id } = req.params
        const response = await remove(id)
        return res.status(response.statusCode).json(response)
    })

module.exports = router