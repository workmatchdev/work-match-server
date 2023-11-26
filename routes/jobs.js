const express = require('express');
const router = express.Router();
// const auth = require('../middleware/auth');
const jobsController = require('../controllers/jobsController');

router.get('/:id',jobsController.getAllJobs);
router.get('/getJob/:id',jobsController.getJobById);
router.get('/skills/:search',jobsController.getSkills);
router.get('/sectores/:search',jobsController.getSector);
router.post('/create',jobsController.createJob);
router.put('/update/:id',jobsController.updateJobById);
router.delete('/delete/:id',jobsController.deleteJobById);
router.post('/getAvalibleMatchs',jobsController.getAvalibleJobs);

module.exports = router;