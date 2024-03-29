const mongoose = require('mongoose');

const ApplicantsSchema = mongoose.Schema({
    image:{
        type: Object,
        default:{
            url: 'default'
        }
    },
    name: {
        type: String
    },
    lastName: {
        type: String
    },
    gender: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String,
        default: true
    },
    status: {
        type: Boolean,
        default: true
    },
    userType: {
        type: String,
    },
    created: {
        type: Date,
        default: Date.now()
    },
    profile: {
        type: Object,
        default: {
            bussinesName: null,
            skills: [],
            experience: [],
            studies: []
        }
    }
})

module.exports = mongoose.model('Applicants', ApplicantsSchema);