const express = require('express');
const router = express.Router();


const controllerQrCode = require('../controllers/qrcodeController')


router.put('/:id', controllerQrCode.qrcodeUpdateTutoria)



module.exports = app => app.use('/api/qrcode', router);