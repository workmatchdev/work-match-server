const mongoose = require('mongoose');

const AdminsSchema = mongoose.Schema({
    name: {
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
    created: {
        type: Date,
        default: Date.now()
    },
    rol: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        ref: 'Roles'
    }
})

module.exports = mongoose.model('Admins', AdminsSchema);