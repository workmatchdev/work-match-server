const Notifications = require('../models/Notifications');

const nofificationTexts = {
    "newMatch": 'Felicidades tienes un nuevo match ve a tus chat para ponerte en contacto',
    "newPayment": 'Se ha activado tu membresia gracias por tu compra',
    "limitMatches": "Has llegado al limite de tus matchs del dia de hoy",
    "noReadMessages": "Tienes mensajes sin leer ve a tus mensajes para ponerte al corriente.",
    "membershipFinished": "Tu membresia ha caducado"
}

exports.createNotification = async (userId, type) => {
    try {
        const message = nofificationTexts[type];
        const newBody = {
            text: message,
            type,
            user: userId
        }
        const newNoti = new Notifications(newBody);
        global.io.emit('notification', newNoti);
        const savedNoti = await newNoti.save();
        return savedNoti
    } catch (error) {
        console.log(error);
        return error
    }
}