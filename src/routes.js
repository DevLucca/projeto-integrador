const express = require('express');
const PointController = require('./controllers/PointController');
const EmailController = require('./controllers/EmailController');
const routes = express.Router();

routes.post('/point/cadastrar', PointController.store);
routes.get('/point/lista', PointController.show);
routes.post('/point/lista/delete/:_id', PointController.delete);
routes.post('/email/cadastrar', EmailController.store);

module.exports = routes;