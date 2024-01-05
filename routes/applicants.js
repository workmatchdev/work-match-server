const express = require('express');
const router = express.Router();
// const auth = require('../middleware/auth');
const applicantsController = require('../controllers/applicantsController');

router.get('/getApplicant/:id',applicantsController.getApplicantsById);
router.get('/:page/:userType',applicantsController.getUsersPagination);
router.post('/getApplicants/matchs',applicantsController.getApplicantsToMatch);
router.post('/create',applicantsController.createUser);
router.put('/update/:id',applicantsController.editUser);
router.delete('/delete/:id',applicantsController.deleteUser);
router.put('/upadateSkills/:id',applicantsController.upadateSkills);
router.put('/upadateStudies/:id',applicantsController.upadateStudies);
router.put('/upadateExperience/:id',applicantsController.upadateExperience);
router.delete('/removeExperience/:userId/:experienceId',applicantsController.removeExperience);
router.delete('/removeStudies/:userId/:studyId',applicantsController.removeStudies);
router.delete('/removeSkills/:userId/:skillId',applicantsController.removeSkills);
router.post('/uploadImage',applicantsController.uploadProfileImage);


module.exports = router;