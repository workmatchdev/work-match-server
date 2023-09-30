const express = require('express');
const router = express.Router();
// const auth = require('../middleware/auth');
const activeMembershipsController = require('../controllers/activeMembershipsController');

router.get('/',activeMembershipsController.activateMembership);
// router.get('/getMatch/:id',activeMembershipsController.getMatchById);
// router.post('/create',activeMembershipsController.createMatch);
// router.put('/update/:id',activeMembershipsController.updateMatchById);
// router.delete('/delete/:id',activeMembershipsController.deleteMatchById);

module.exports = router;