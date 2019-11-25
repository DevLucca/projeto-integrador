const { Schema, model } = require('mongoose')

const PointSchema = new Schema({
    endereco: {
        type: String,
        required: true,
    },
    CEP: {
        type: String,
        required: false,
    },
    lat: {
        type: Number,
        required: true,
    },
    long: {
        type: Number,
        required: true,
    },
    tipo: [{
        type: Number,
        required:true,
    }],
    active: {
        type: Boolean,
        required: true,
    }
}, {
    timestamps: true,
})

module.exports = model('point', PointSchema)