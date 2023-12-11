const express = require('express');
const router = express.Router();
// const auth = require('../middleware/auth');
const activeMembershipsController = require('../controllers/activeMembershipsController');

router.post('/paymentTest',activeMembershipsController.paymentTest);
router.post('/payment-intent-stripe',activeMembershipsController.stripePaymentInten)
router.post('/activate',activeMembershipsController.activateMembership);
// router.post('/create',activeMembershipsController.createMatch);
// router.put('/update/:id',activeMembershipsController.updateMatchById);
// router.delete('/delete/:id',activeMembershipsController.deleteMatchById);

module.exports = router;