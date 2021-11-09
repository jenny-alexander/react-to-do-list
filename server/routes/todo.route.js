const router = require( 'express' ).Router();
const { application } = require('express');

//DB Connection
const pool = require( '../modules/pool' );

const replaceApostrophe = ( singleApostropheString )=>{
    let doubleApostropheString = singleApostropheString.replace( /'/g, "''");
    return doubleApostropheString;
}

//GET Route
router.get( '/', ( req, res ) =>{
    const queryString = `SELECT * from tasks ORDER BY id DESC;`;
    pool.query( queryString ).then( (results ) =>{
        res.send( results.rows );
    }).catch( ( error ) =>{
        console.log( error );
        res.sendStatus( 500 );
    })
})

//DELETE Route
router.delete('/delete/:id', ( req, res )=>{
    const queryString = `DELETE FROM tasks WHERE id='${req.params.id}';`;
    pool.query( queryString ).then( ( result )=>{
        res.sendStatus( 200 );
    }).catch( ( error )=>{
        console.log( `DELETE error is:`, error );
        res.sendStatus( 500 );
    })
})

//POST Route (Create new task)
router.post('/', ( req, res )=>{
    const queryString = `INSERT INTO tasks (task_name, assigned_to)
                         VALUES ($1,$2);`;
    let values = [req.body.taskName, req.body.assignedTo];
    pool.query( queryString, values ).then( ( results )=>{
        res.sendStatus( 201 );
    }).catch( ( error )=>{
        console.log( error );
        res.sendStatus( 500 );
    })
});

//PUT Route for completing task 
router.put( '/completed/:id', ( req, res )=>{
    //Do some minor data manipulation to ensure the database accepts the values from the front-end.
    replaceApostrophe( req.body.dateCompleted );
    if( typeof req.body.dateCompleted === 'string' ) {
        req.body.dateCompleted = "'" + req.body.dateCompleted + "'";
    }
    const queryString = `UPDATE tasks SET date_completed = ${req.body.dateCompleted},
                                          completed = ${req.body.completed}
                         WHERE id = ${req.params.id};`;
    pool.query( queryString ).then( ( results )=>{
        res.sendStatus( 200 );
    }).catch( ( error )=>{
        console.log( error );
        res.sendStatus( 500 );
    })
})

//PUT Route for updating task name and assigned to values
router.put( '/update/:id', ( req, res )=>{
    console.log( `in PUT UPDATE with req.body:,`, req.body );
    //Do some minor data manipulation to ensure the database accepts the values from the front-end.
    replaceApostrophe( req.body.dateCompleted );
    if( typeof req.body.dateCompleted === 'string' ) {
        req.body.dateCompleted = "'" + req.body.dateCompleted + "'";
    }

    const queryString = `UPDATE tasks SET task_name = ${req.body.taskName},
                                          assigned_to = ${req.body.assignedTo}
                         WHERE id = ${req.params.id};`;
                         
    pool.query( queryString ).then( ( results )=>{
        res.sendStatus( 200 );
    }).catch( ( error )=>{
        console.log( error );
        res.sendStatus( 500 );
    })
})

module.exports = router;