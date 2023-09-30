const express = require('express');
const router = express.Router();
// const auth = require('../middleware/auth');
const companyController = require('../controllers/companyController');

router.get('/',companyController.getAllCompanies);
router.get('/getCompany/:id',companyController.getCompanyById);
router.post('/create',companyController.createCompany);
router.put('/update/:id',companyController.updateCompanyById);
router.delete('/delete/:id',companyController.deleteCompanyById);

module.exports = router;