const mongoose = require('mongoose');

const ConfigurationsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    configuration: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Configuration', ConfigurationsSchema);