const notFound = (req, res) => res.status(404).send('this page does not exists')

module.exports = { notFound }