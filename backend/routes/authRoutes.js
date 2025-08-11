const express = require("express");
const router = express.Router();
const authCtrl = require('../controller/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register',authCtrl.register);
router.post('/login',authCtrl.login);
router.get('/dashboard',authCtrl.dashboard);

module.exports = router;
