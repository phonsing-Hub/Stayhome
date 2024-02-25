
const knex = require('knex');
const db = knex.default({
    client: 'mysql2',
    connection: {
        user: 'apl01',
        password: 'apl.server01',
        host: 'apl-ps.trueddns.com',
        port: 49591,
        database: 'apl-ps'
    }
});
module.exports = db;