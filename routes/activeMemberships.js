const express = require('express');
const router = express.Router();
// const auth = require('../middleware/auth');
const activeMembershipsController = require('../controllers/activeMembershipsController');

router.post('/paymentTest',activeMembershipsController.paymentTest);
// router.get('/getMatch/:id',activeMembershipsController.getMatchById);
// router.post('/create',activeMembershipsController.createMatch);
// router.put('/update/:id',activeMembershipsController.updateMatchById);
// router.delete('/delete/:id',activeMembershipsController.deleteMatchById);

module.exports = router;