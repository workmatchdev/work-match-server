const express = require('express');
const router = express.Router();
// const auth = require('../middleware/auth');
const matchController = require('../controllers/matchController');

router.get('/',matchController.getAllMatches);
router.get('/getMatch/:id',matchController.getMatchById);
router.post('/create',matchController.createMatch);
router.put('/update/:id',matchController.updateMatchById);
router.delete('/delete/:id',matchController.deleteMatchById);

module.exports = router;