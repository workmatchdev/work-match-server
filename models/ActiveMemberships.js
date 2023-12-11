const mongoose = require('mongoose');

const ActiveMembershipsSchema = mongoose.Schema({
    durations: {
        type: Object,
        required: true
    },
    created: {
        type: Date,
        default: Date.now()
    },
    membership: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status: {
        type: Boolean,
        default: true
    },
    validity:{
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'Applicants',
    }
})

module.exports = mongoose.model('ActiveMemberships', ActiveMembershipsSchema);