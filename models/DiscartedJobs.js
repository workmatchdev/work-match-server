const mongoose = require('mongoose');

const DiscartedJobsSchema = mongoose.Schema({
    created: {
        type: Date,
        default: Date.now()
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
    }
})

module.exports = mongoose.model('DiscartedJobs', DiscartedJobsSchema);