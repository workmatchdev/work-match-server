const mongoose = require('mongoose');

const RolesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    privileges: {
        type: Array,
        require: true
    },
    isEditable: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('Roles', RolesSchema);