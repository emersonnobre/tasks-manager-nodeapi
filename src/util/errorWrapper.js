const { INTERNAL_SERVER_ERROR } = require('../enum/status-code')

module.exports = async (fn, typeOfResponse) => {
    try {
        return await fn()
    } catch (error) {
        console.log(error)
        return typeOfResponse ? typeOfResponse(INTERNAL_SERVER_ERROR, null, error) : { error }
    }
}
