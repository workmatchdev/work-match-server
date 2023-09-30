const mongoose = require('mongoose');

const NotificationsSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    type: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    },
    review: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        ref: 'Users'
    },
})

module.exports = mongoose.model('Notifications', NotificationsSchema);