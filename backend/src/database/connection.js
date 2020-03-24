const knex = require('knex');
const dbConf = require('../../knexfile');

const connection = knex(dbConf.development);

module.exports = connection;