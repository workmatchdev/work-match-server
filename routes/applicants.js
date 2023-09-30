const express = require('express');
const router = express.Router();
// const auth = require('../middleware/auth');
const applicantsController = require('../controllers/applicantsController');

router.get('/',applicantsController.getUsersPagination);
router.get('/getApplicant/:id',applicantsController.getApplicantsById);
router.post('/create',applicantsController.createUser);
router.put('/update/:id',applicantsController.editUser);
router.delete('/delete/:id',applicantsController.deleteUser);



module.exports = router;