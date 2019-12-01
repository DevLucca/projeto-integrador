const { Schema, model } = require('mongoose')

const EmailSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
    }
}, {
    timestamps: true,
})

module.exports = model('email', EmailSchema)