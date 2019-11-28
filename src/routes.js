const express = require('express');
const PointController = require('./controllers/PointController')
const routes = express.Router();

routes.post('/point/cadastrar', PointController.store);
routes.get('/point/lista', PointController.show);
routes.post('/point/lista/delete/:_id', PointController.delete);

module.exports = routes;