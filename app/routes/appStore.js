
const router = require('express').Router();
const controller = require('../components/appStore/controller');
const { isAuthenticated, isUserTypeAllowed, asyncExecute } = require('../middlewares');
const { USERTYPE_ADMIN, USERTYPE_USER, USERTYPE_GUEST } = require('../constants/model');

router.get('/', asyncExecute(isAuthenticated), isUserTypeAllowed(USERTYPE_ADMIN, USERTYPE_USER, USERTYPE_GUEST), asyncExecute(controller.getStore));
router.put('/', asyncExecute(isAuthenticated), isUserTypeAllowed(USERTYPE_ADMIN), asyncExecute(controller.update));

module.exports = router;