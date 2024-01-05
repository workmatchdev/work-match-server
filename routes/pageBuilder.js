const express = require('express');
const router = express.Router();
const {
    getAllPages,
    getPageById,
    createPage,
    updatePageById,
    deletePageById,
    updatePageTermsById,
    updatePagePolicyById,

    createBlogEntrance,
    updateBlogEntranceById,
    getAllBlogEntrance,
    getBlogEntranceById,
    deleteBlogEntranceById

} = require('../controllers/pagesControler');

// router.get('/pages', getAllPages);
router.get('/pages/getAllBlogEntrance', getAllBlogEntrance);
router.get('/pages/getBlogEntranceById/:id', getBlogEntranceById);
router.get('/pages/:id', getPageById);

// router.post('/pages', createPage);
router.post('/pages/createBlogEntrance', createBlogEntrance);
router.put('/pages/updatePagePolicy/:id', updatePagePolicyById)
router.put('/pages/updatePageTerms/:id', updatePageTermsById);
router.put('/pages/updateLandingPage/:id', updatePageById);
router.put('/pages/updateBlogEntrance/:id', updateBlogEntranceById);

router.delete('/pages/deleteBlogEntrance/:id', deleteBlogEntranceById);

// router.delete('/pages/:id', deletePageById);

module.exports = router;