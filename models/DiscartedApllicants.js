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
    Applicant: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        ref: 'Applicants'
    }
})

module.exports = mongoose.model('DiscartedAplicants', DiscartedAplicantsSchema);