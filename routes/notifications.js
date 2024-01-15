const express = require('express');
const router = express.Router();
// const auth = require('../middleware/auth');
const notificationsController = require('../controllers/notificationsController');

router.get('/getNotifications/:id',notificationsController.getAllNotifications);
// router.post('/create',notificationsController.createMembership);
router.put('/update/:id',notificationsController.updateNotificationById);
// router.delete('/delete/:id',notificationsController.deleteMembershipById);

module.exports = router;