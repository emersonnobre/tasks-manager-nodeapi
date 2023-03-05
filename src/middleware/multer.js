const multer = require('multer')

module.exports = multer({ 
    limits: {
        fileSize: 1000000
    },
    fileFilter(_req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/))
            return cb(new Error('Only images are accepted!'))
        return cb(undefined, true)
    }
})