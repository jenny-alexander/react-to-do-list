const pg = require( 'pg' );

const pool = new pg.Pool(
    {
        database: 'weekend_to_do_app',
        localhost: 'localhost',
        port: 5432,
        max: 12,
        idleTimeoutMillis: 30000
    }
)

module.exports = pool;