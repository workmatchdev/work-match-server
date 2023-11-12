const mongoose = require('mongoose');

const ChatsSchema = mongoose.Schema({
    bussines: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        ref: 'Applicants'
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        ref: 'Applicants'
    }
})

module.exports = mongoose.model('Chats', ChatsSchema);