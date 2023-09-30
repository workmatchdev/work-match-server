const mongoose = require('mongoose');

const MatchsSchema = mongoose.Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        ref: 'Users'
    },
    status:{
        type: String,
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        ref: 'Companies'
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        ref: 'Jobs'
    }
})

module.exports = mongoose.model('Matchs', MatchsSchema);