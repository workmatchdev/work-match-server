const express = require('express');
const router = express.Router();
// const auth = require('../middleware/auth');
const supportController = require('../controllers/supportController');

router.get('/', supportController.getAllSupports);
router.post('/create', supportController.createSupport);
router.put('/update/:id', supportController.updateSupportById);
router.delete('/delete/:id', supportController.deleteSupportById);

module.exports = router;