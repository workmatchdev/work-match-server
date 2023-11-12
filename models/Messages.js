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
    },
    view: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Messages', MessageSchema);