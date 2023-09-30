const express = require('express');
const router = express.Router();
// const auth = require('../middleware/auth');
const membershipsController = require('../controllers/membershipsController');

router.get('/',membershipsController.getAllMemberships);
router.get('/getMembership/:id',membershipsController.getMembershipById);
router.post('/create',membershipsController.createMembership);
router.put('/update/:id',membershipsController.updateMembershipById);
router.delete('/delete/:id',membershipsController.deleteMembershipById);

module.exports = router;