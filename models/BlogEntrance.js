const mongoose = require('mongoose');

const BlogEntranceSchema = mongoose.Schema({
    title: { type: String },
    url: { type: String },
    image: { type: Object },
    shortDescription: { type: String },
    longDescription: { type: String },
    update: { type: Date }
})

module.exports = mongoose.model('BlogEntrance', BlogEntranceSchema);