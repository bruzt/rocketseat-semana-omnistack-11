const express = require('express');
const cors = require('cors');

const routes = require('./routes');

const server = express();

server.use(cors({ origin: '*' }));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(routes);

server.listen(3333);