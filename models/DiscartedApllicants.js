const mongoose = require('mongoose');

const DiscartedAplicantsSchema = mongoose.Schema({
    created: {
        type: Date,
        default: Date.now()
    },
    company: {
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

module.exports = mongoose.model('DiscartedAplicants', DiscartedAplicantsSchema);