
const router = require('express').Router();
const controller = require('../modules/user/controller');
const { isAuthenticated, isUserTypeAllowed, asyncExecute } = require('../middlewares');
const { USERTYPE_USER, USERTYPE_ADMIN } = require('../constants/model');

router.post('/send-login-otp', asyncExecute(controller.sendLoginOtp));
router.post('/login', asyncExecute(controller.login));
router.post('/guest-login', asyncExecute(controller.guestLogin));
router.post('/social-login/google', asyncExecute(controller.googleSignin));
router.post('/social-login/facebook', asyncExecute(controller.facebookSignin));

router.get('/me', asyncExecute(isAuthenticated), isUserTypeAllowed(USERTYPE_USER), asyncExecute(controller.getProfile));
router.put('/me', asyncExecute(isAuthenticated), isUserTypeAllowed(USERTYPE_USER), asyncExecute(controller.updateProfile));
router.post('/me/send-update-phone-otp', asyncExecute(isAuthenticated), isUserTypeAllowed(USERTYPE_USER), asyncExecute(controller.sendUpdatePhoneOtp));
router.post('/me/update-phone', asyncExecute(isAuthenticated), isUserTypeAllowed(USERTYPE_USER), asyncExecute(controller.updatePhone));

router.get('/', asyncExecute(isAuthenticated), isUserTypeAllowed(USERTYPE_ADMIN), asyncExecute(controller.getPaginatedList));
router.post('/csv', asyncExecute(isAuthenticated), isUserTypeAllowed(USERTYPE_ADMIN), asyncExecute(controller.exportList));
router.post('/:userId/block', asyncExecute(isAuthenticated), isUserTypeAllowed(USERTYPE_ADMIN), asyncExecute(controller.block));
router.post('/:userId/unblock', asyncExecute(isAuthenticated), isUserTypeAllowed(USERTYPE_ADMIN), asyncExecute(controller.unblock));

module.exports = router;