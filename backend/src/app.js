const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');

const routes = require('./routes');

const server = express();

server.use(cors({ origin: '*' }));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(routes);

server.use(errors());

module.exports = server;