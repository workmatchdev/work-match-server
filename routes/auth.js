// Rutas para crear ususarios
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

//Iniciar sesions
// api/auth
router.post('/',
    // Validacion de API
    authController.authenticateUser);
router.get('/',
    auth,
    authController.authenticatedUser
);
router.post('/user/auth/app',
    authController.authenticateUserApp
)
router.put('/password', authController.changePassword);

module.exports = router;  