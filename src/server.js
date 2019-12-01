const express = require('express');
const mongoose = require('mongoose');
const config = require('./config.json');
const routes = require('./routes');
const server = express();

mongoose.connect(`mongodb+srv://${config.mongo.connectionString}`, config.mongo.options);

server.use(express.json());
server.use(routes);
server.listen(3000);