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
    userType: {
        type: String,
        enum: ['Applicants', 'Companies'],
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'userType',
    }
})

ActiveMembershipsSchema.virtual('user', {
    ref: function (doc) {
        return doc.userType;
    },
    localField: 'userId',
    foreignField: '_id',
    justOne: true,
});

module.exports = mongoose.model('ActiveMemberships', ActiveMembershipsSchema);