const mongoose = require('mongoose');

const MembershipsSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    data:{
        type: Object,
        default: {}
    },
    countMatchs:{
        type: Number,
        required: true
    },
    disaccount:{
        type: Number,
        required: true
    },
    benefits: {
        type: Array,
        required: true
    },
    duration: {
        type: Object,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    status:{
        type:Boolean,
        default:true
    }
})

module.exports = mongoose.model('Memberships',MembershipsSchema);