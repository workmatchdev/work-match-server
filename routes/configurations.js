const express = require('express');
const router = express.Router();
const configurations = require('../controllers/configurations');

router.post('/create', configurations.createConfigurations);
router.put('/update/:id', configurations.updateConfigurations);
router.get('/getData/:id', configurations.getAllConfigurations)

module.exports = router;