const mongoose = require('mongoose')
const Task = require('./Task')
const { isEmail } = require('validator')
const { hash, compare } = require('bcryptjs')

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
    },
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true,
})

UserSchema.statics.findByEmailAndPassword = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) return null
    const isMatch = await compare(password, user.password)
    if (!isMatch) return null
    return user
}

UserSchema.pre('save', async function (next) {
    if (this.isModified('password'))
        this.password = await hash(this.password, 8)

    next()
})

UserSchema.pre('remove', async function (next) {
    await Task.deleteMany({ owner: this._id })
    next()
})

const User = mongoose.model('User', UserSchema)

module.exports = User