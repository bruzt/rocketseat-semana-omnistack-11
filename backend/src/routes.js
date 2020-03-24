const express = require('express');

const autoRequireAll = require('./utils/autoRequireAll');
const controllers = autoRequireAll(__dirname, './controllers');

const router = express.Router();

////////////

router.get('/ongs', controllers.ongController.index);
router.post('/ongs', controllers.ongController.store);

router.get('/incidents', controllers.incidentController.index);
router.post('/incidents', controllers.incidentController.store);
router.delete('/incidents/:id', controllers.incidentController.destroy);

router.get('/profile', controllers.profileController.index);

router.post('/session', controllers.sessionController.store);

////////////

module.exports = router;