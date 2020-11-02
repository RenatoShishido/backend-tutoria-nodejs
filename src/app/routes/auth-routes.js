const express = require('express');
const router = express.Router();


const controllerAuth = require('../controllers/authController')


router.post('/register', controllerAuth.registerAuth)
router.post('/authenticate', controllerAuth.authenticate)
router.post('/forgot_password', controllerAuth.forgotPassword)
router.post('/reset_password', controllerAuth.resetPassword)



module.exports = app => app.use('/api/auth', router);