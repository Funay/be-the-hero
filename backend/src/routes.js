const { Router } = require('express');

const OngController = require('./controllers/OngController');
const InsidentController = require('./controllers/InsidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
const { celebrate, Segments, Joi} = require('celebrate');

const routes = Router();

routes.get('/ongs', OngController.index);
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city:Joi.string().required(),
        uf:Joi.string().length(2).required()
    })
}), OngController.store);

routes.post('/incidents',celebrate({
    [Segments.QUERY]: {
        page: Joi.number()
    }
}), InsidentController.store);
routes.get('/incidents', InsidentController.index);
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), InsidentController.delete);

routes.get('/profiles', celebrate({
    [Segments.HEADERS]: Joi.object({
        ong_id: Joi.string().required()
    }).unknown()
}) ,ProfileController.index);

routes.post('/sessions', SessionController.store);

module.exports = routes;