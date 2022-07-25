const jwt = require('jsonwebtoken')
const { getById } = require('../services/user')
const { UNAUTHORIZED } = require('../enum/status-code')

module.exports = async function(req, res, next) {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'temp$secret')
        const user = await getById(decoded._id)
        if (!user) throw new Error()
        req.user = user.data
        next()
    } catch (error) {
        res.status(UNAUTHORIZED).json({ error: 'Unauthorized' })
    }
}