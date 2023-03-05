const mongoose = require('mongoose')

module.exports = (url) => mongoose.connect(url, { 
    directConnection: true,
    tls: true,
    tlsCAFile: 'rds-combined-ca-bundle.pem',
    tlsAllowInvalidHostnames: true,
    serverSelectionTimeoutMS: 3000
})