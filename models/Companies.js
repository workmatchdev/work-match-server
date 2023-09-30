const mongoose = require('mongoose');

const CompaniesSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    lastName:{
        type:String,
        required: true
    },
    password:{
        type:String
    },
    email:{
        type:Boolean,
        default:true
    },
    companyName: {
        type: String,
        required: true
    },
    status:{
        type:Boolean,
        default:true
    }
})

module.exports = mongoose.model('Companies',CompaniesSchema);