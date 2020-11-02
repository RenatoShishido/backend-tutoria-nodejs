const express = require('express');
const router = express.Router();


const controllerEmail = require('../controllers/emailController')


router.post('/', controllerEmail.sendEmail)



module.exports = app => app.use('/api/email', router);