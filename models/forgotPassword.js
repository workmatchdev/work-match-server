const mongoose = require('mongoose');

const ForgotPasswordSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('ForgotPassword', ForgotPasswordSchema);