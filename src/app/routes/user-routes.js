const express = require('express');
const router = express.Router();
const multer = require('multer');
const configMulter = require('../middleware/multer')

const controllerUser = require('../controllers/userController')
const middlewareAuth = require('../middleware/auth')
const middlewareAdmin = require('../middleware/admin')

// router.use(middlewareAuth);

router.get('/', controllerUser.findUserAll)
router.get('/perfil/:perfilId', controllerUser.findUserId)
router.delete('/remove/:id', middlewareAdmin(controllerUser.removeUser))
router.put('/update/:id', 
multer(configMulter).single("file"),
controllerUser.updateUser)


module.exports = app => app.use('/api/users', router);