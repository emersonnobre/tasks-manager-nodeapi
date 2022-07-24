const mongoose = require('mongoose')
const { isEmail } = require('validator')
const { hash } = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must provide a name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'must provide an e-mail'],
        unique: [true, 'This e-mail is already in use'],
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

UserSchema.pre('save', async function (next) {
    if (this.isModified('password'))
        this.password = await hash(this.password, 8)

    next()
})

module.exports = mongoose.model('User', UserSchema)