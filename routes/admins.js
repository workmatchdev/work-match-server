const express = require('express');
const router = express.Router();
// const auth = require('../middleware/auth');
const adminsController = require('../controllers/adminsController');

router.get('/',adminsController.getAllAdmins);
router.get('/getAdmin/:id',adminsController.getAdminById);
router.post('/create',adminsController.createAdmin);
router.put('/update/:id',adminsController.updateAdminById);
router.delete('/delete/:id',adminsController.deleteAdminById);

module.exports = router;