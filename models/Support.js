const mongoose = require('mongoose');

const SupportSchema = mongoose.Schema({
    name: {
        type: Object,
        required: true
    },
    email: {
        type: Object,
        required: true
    },
    image: {
        type: Object
    },
    message: {
        type: Object
    },
    status: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Support', SupportSchema);