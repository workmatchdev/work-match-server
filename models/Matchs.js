const mongoose = require('mongoose');

const MatchsSchema = mongoose.Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    status:{
        type: String,
        required: true,
        default: 'pendding'
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        ref: 'Jobs'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        ref: 'Applicants'
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        ref: 'Applicants'
    },
})

module.exports = mongoose.model('Matchs', MatchsSchema);