const { Router } = require('express');

const OngController = require('./controllers/OngController');
const InsidentController = require('./controllers/InsidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = Router();

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.store);

routes.post('/incidents', InsidentController.store);
routes.get('/incidents', InsidentController.index);
routes.delete('/incidents/:id', InsidentController.delete);

routes.get('/profiles', ProfileController.index);

routes.post('/sessions', SessionController.store);

module.exports = routes;