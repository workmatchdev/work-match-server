const express = require('express');
const router = express.Router();
// const auth = require('../middleware/auth');
const matchController = require('../controllers/matchController');

router.get('/:user',matchController.getAllMatches);
router.get('/getMatch/:id',matchController.getMatchById);
router.post('/discartJob',matchController.discartedJob)
router.post('/discartApplicant',matchController.discartedApllicants)
router.post('/create',matchController.createMatch);
router.put('/update/:id',matchController.updateMatchById);
router.delete('/delete/:id',matchController.deleteMatchById);

module.exports = router;