const knex = require('knex');
const dbConf = require('../../knexfile');

const conf = (process.env.NODE_ENV == 'test') ? dbConf.test : dbConf.development;

const connection = knex(conf);

module.exports = connection;