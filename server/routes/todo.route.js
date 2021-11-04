const router = require( 'express' ).Router();
const pool = require( '../modules/pool' );

router.get( '/', ( req, res ) =>{
    console.log( `/todo GET` );
    const queryString = `SELECT * from tasks;`;
    pool.query( queryString ).then( (results ) =>{
        res.send( results.rows );
    }).catch( ( error ) =>{
        console.log( error );
        res.sendStatus( 500 );
    })
})

module.exports = router;