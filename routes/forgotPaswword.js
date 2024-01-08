const express = require('express');
const router = express.Router();
// const auth = require('../middleware/auth');
const forgotPassword = require('../controllers/forgotPassword');

router.post('/validateEmail',forgotPassword.validateEmail);
router.post('/validateCode',forgotPassword.validateCode);
router.post('/changePassword',forgotPassword.changePassword);


module.exports = router;