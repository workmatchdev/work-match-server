const Chat = require('../models/Chats');
const Messages = require('../models/Messages');

exports.getChats = async (req, res) => {
    try {
        const id = req.params.id;
        const chats = await Chat.find(
            {
                $or: [
                    { bussines: id },
                    { applicant: id }
                ]
            }
        )
            .populate('applicant')
            .populate('bussines');

        const formattChats = await Promise.all(
            chats.map(async chat => {
                const lastMessages = await Messages.find({ chat: chat._id }).limit(1);
                const counterMessagesNoView = await Messages.countDocuments({ view: false })
                return {
                    lastMessages,
                    counterMessagesNoView,
                    _id: chat._id,
                    bussines: chat.bussines,
                    applicant: chat.applicant
                }
            })
        )
        

        res.status(200).json({ data: formattChats })
    } catch (error) {
        res.status(500).json({ message: 'Ha ocurrido un error al recuperar los chats' })
    }
}

exports.getMessages = async (req, res) => {
    try {
        const id = req.params.id;
        const messages = await Messages.find({ chat: id });
        res.status(200).json({ data: messages })
    } catch (error) {
        res.status(500).json({ message: 'Ha ocurrido un error al recuperar los mensajes' })
    }
}

exports.createChat = async (req, res) => {
    try {
        const { bussines, applicant } = req.body;
        const validateIfChatExist = await Chat.findOne({ bussines, applicant });
        if (validateIfChatExist) {
            res.status(500).json({ message: 'Este chat ya existe', status: false })
            return
        }
        const newChat = {
            bussines, applicant
        };
        const chat = new Chat(newChat);
        const saveChat = await chat.save();
        res.status(200).json({ data: saveChat, message: 'Chat creado correctamente' })
    } catch (error) {
        res.status(500).json({ message: 'Ha ocurrido un error al enviar el mensajes' })
    }
}

exports.sendMessage = async (req, res) => {
    try {
        const { message, chatId } = req.body;
        const messageContent = {
            message,
            chat: chatId
        };
        const newMessages = new Messages(messageContent);
        newMessages.save((err) => {
            if (err) sendStatus(500);
            global.io.emit('mensaje', req.body);
            res.status(200).json({ data: newMessages, message: 'Mensaje eviado creado correctamente', status: true })
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Ha ocurrido un error al enviar los mensajes' })
    }
}