const mongoose = require('mongoose');

const JobsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    term: {
        type: String,
        required: true
    },
    limitMatches: {
        type: Number,
        default: 10,
        required: true
    },
    matchs:{
        type: Number,
        default: 0
    },
    maximumSalary: {
        type: String,
        required: true
    },
    minimumSalary: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    keywords: {
        type: Array
    },
    extraKeywords: {
        type: Array
    },
    avalibe: {
        type: Boolean
    },
    date: {
        type: Date,
        default: Date.now()
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        ref: 'Companies'
    }
})

module.exports = mongoose.model('Jobs', JobsSchema);