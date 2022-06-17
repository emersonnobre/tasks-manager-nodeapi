const mongoose = require('mongoose')
const { isEmail } = require('validator')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must provide a name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'must provide an e-mail'],
        trim: true,
        lowercase: true,
        validate(value) {
            if (!isEmail(value)) throw new Error('invalid e-mail format')
        }
    },
    password: {
        type: String,
        required: [true, 'must provide a password'],
        trim: true,
        minlength: 6
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) throw new Error('Age must be a positive number')
        }
    }
})

module.exports = mongoose.model('User', UserSchema)