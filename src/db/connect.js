const mongoose = require('mongoose')

module.exports = () => mongoose.connect(process.env.MONGO_URI, { 
    directConnection: true,
    tls: true,
    tlsCAFile: 'rds-combined-ca-bundle.pem',
    tlsAllowInvalidHostnames: true,
    serverSelectionTimeoutMS: 3000
})