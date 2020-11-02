const express = require('express');
const router = express.Router();

const controllerTutoria = require('../controllers/tutoriaController')
const middlewareAuth = require('../middleware/auth')

router.use(middlewareAuth);

router.get('/', controllerTutoria.findTutoria)
router.get('/getTutoriasOferecidas', controllerTutoria.findTutoriaOferecida)
router.get('/:tutoriaId', controllerTutoria.findTutoriaId)
router.get('/pagination/search/:Id', controllerTutoria.searchTutoria)
router.get('/agendado/:pageId', controllerTutoria.paginationTutoriaAgendado)
router.get('/pagination/:pageId', controllerTutoria.paginationTutoria)
router.post('/', controllerTutoria.createTutoria)
router.put('/putTutoriaOferecida/:tutoriaId', controllerTutoria.updateTutoriaAluno)
router.put('/:tutoriaId', controllerTutoria.updateTutoria)
router.delete('/:tutoriaId', controllerTutoria.removeTutoria)


module.exports = app => app.use("/api/tutorias", router);