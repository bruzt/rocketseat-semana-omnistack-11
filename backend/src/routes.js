const express = require('express');

const autoRequireAll = require('./utils/autoRequireAll');
const controllers = autoRequireAll(__dirname, './controllers');
const validators = autoRequireAll(__dirname, './validators');

const router = express.Router();

////////////

router.get('/ongs', controllers.ongController.index);
router.post('/ongs', validators.ongValidators.store, controllers.ongController.store);

router.get('/incidents', validators.incidentValidators.index, controllers.incidentController.index);
router.post('/incidents', validators.incidentValidators.store, controllers.incidentController.store);
router.delete('/incidents/:id', validators.incidentValidators.destroy, controllers.incidentController.destroy);

router.get('/profile', validators.profileValidators.index, controllers.profileController.index);

router.post('/session', controllers.sessionController.store);

////////////

module.exports = router;