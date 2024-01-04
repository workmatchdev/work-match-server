const mongoose = require('mongoose');

const PagesSchema = mongoose.Schema({
    title1: { type: String },
    title2: { type: String },
    background1: { type: Object },
    card1: { type: String },
    backgroundCard1: { type: Object },
    descriptionCard1: { type: String },
    card2: { type: String },
    backgroundCard2: { type: Object },
    descriptionCard2: { type: String },
    card3: { type: String },
    backgroundCard3: { type: Object },
    descriptionCard3: { type: String },
    bannerTitle: { type: String },
    backgroundBanner: { type: Object },
    descriptionBanner: { type: String },
    facebook: {
        type: String,
    },
    youtube: {
        type: String,
    },
    linkedin: {
        type: String,
    },
    email: {
        type: String,
    },
    terminosYcondiciones: {
        type: String
    },
    politicaDePrivacidad: {
        type: String
    },
    updateLanding: {
        type: Date,
    },
    updatePolicy: {
        type: Date,
    },
    updateTems: {
        type: Date,
    }
})

module.exports = mongoose.model('Pages', PagesSchema);