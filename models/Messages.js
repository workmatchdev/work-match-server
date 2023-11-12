const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
    message: {
        type: Object,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        ref: 'Chat'
    }
})

module.exports = mongoose.model('Messages', MessageSchema);