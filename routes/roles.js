const express = require('express');
const router = express.Router();
// const auth = require('../middleware/auth');
const adminsController = require('../controllers/rolesController');

router.get('/',adminsController.getAllRoles);
router.post('/create',adminsController.createRole);
router.put('/update/:id',adminsController.updateRoleById);
router.delete('/delete/:id',adminsController.deleteRoleById);

module.exports = router;