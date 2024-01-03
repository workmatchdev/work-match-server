const express = require('express');
const router = express.Router();
const {
    getAllPages,
    getPageById,
    createPage,
    updatePageById,
    deletePageById,
    updatePageTermsById,
    updatePagePolicyById
} = require('../controllers/pagesControler');

// router.get('/pages', getAllPages);
router.get('/pages/:id', getPageById);
// router.post('/pages', createPage);
router.put('/pages/updatePagePolicy/:id',updatePagePolicyById)
router.put('/pages/updatePageTerms/:id', updatePageTermsById);
router.put('/pages/updateLandingPage/:id', updatePageById);
router.delete('/pages/:id', deletePageById);
module.exports = router;