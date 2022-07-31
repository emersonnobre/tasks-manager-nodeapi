module.exports = function(req, _, next) {
    const pagination = {
        limit: parseInt(req.query.limit) ?? 10,
        skip: parseInt(req.query.skip) ?? 0
    }

    req.pagination = pagination

    next()
}