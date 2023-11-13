const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.get('/getChats/:id',chatController.getChats);
router.get('/getMessages/:id',chatController.getMessages);
router.get('/updateMessageStatus/:id/:user',chatController.updateMessageStatus)
router.post('/sendMessage',chatController.sendMessage);
router.post('/initChat',chatController.createChat);

module.exports = router;