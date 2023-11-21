const express = require('express');
const router = express.Router();
// const auth = require('../middleware/auth');
const applicantsController = require('../controllers/applicantsController');

router.get('/:page/:userType',applicantsController.getUsersPagination);
router.get('/getApplicant/:id',applicantsController.getApplicantsById);
router.post('/create',applicantsController.createUser);
router.put('/update/:id',applicantsController.editUser);
router.delete('/delete/:id',applicantsController.deleteUser);
router.put('/upadateSkills/:id',applicantsController.upadateSkills);
router.put('/upadateStudies/:id',applicantsController.upadateStudies);
router.put('/upadateExperience/:id',applicantsController.upadateExperience);
router.delete('/removeExperience',applicantsController.removeExperience);
router.delete('/removeStudies',applicantsController.removeStudies);
router.delete('/removeSkills',applicantsController.removeSkills);
router.post('/uploadImage',applicantsController.uploadProfileImage)


module.exports = router;