const jwt = require('jsonwebtoken')

function createNewToken(payload) {
    return jwt.sign(payload,  'temp$secret', { expiresIn: '1 week' })
}

module.exports = {
    createNewToken,
}