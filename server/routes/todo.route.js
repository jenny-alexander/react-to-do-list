const router = require( 'express' ).Router();
const { application } = require('express');

//DB Connection
const pool = require( '../modules/pool' );

const replaceApostrophe = ( singleApostropheString )=>{
    let doubleApostropheString = singleApostropheString.replace( /'/g, "''");
    return doubleApostropheString;
}

const manipulateDataForDB = ( requestValue )=>{
    //Replace single quotes in the value with two single quotes. Required or the DB will not accept the UPDATE.
    requestValue = replaceApostrophe( requestValue );  
    // If the value is type 'string', add single quotes around it (necessary for DB update to work)
    if ( typeof requestValue == 'string' ) {
        requestValue = "'" + requestValue + "'";
     }
     return requestValue;
}
//GET Route
router.get( '/', ( req, res ) =>{
    const queryString = `SELECT * from tasks ORDER BY id DESC;`;
    pool.query( queryString ).then( (results ) =>{
        res.send( results.rows );
    }).catch( ( error ) =>{
        console.log( `GET error is:`, error );
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
        console.log( `POST error is:`, error );
        res.sendStatus( 500 );
    })
});

//PUT Route for completing task 
router.put( '/completed/:id', ( req, res )=>{
    //Do some minor data manipulation to ensure the database accepts the values from the front-end.
    let formattedDate = manipulateDataForDB( req.body.dateCompleted )
    const queryString = `UPDATE tasks SET date_completed = ${formattedDate},
                                          completed = ${req.body.completed}
                         WHERE id = ${req.params.id};`;
    pool.query( queryString ).then( ( results )=>{
        res.sendStatus( 200 );
    }).catch( ( error )=>{
        console.log( `PUT error is:`, error );
        res.sendStatus( 500 );
    })
})

//PUT Route for updating task name and assigned to values
router.put( '/update/:id', ( req, res )=>{
    //Do some minor data manipulation to ensure the database accepts the values from the front-end.
    let formattedTaskName = manipulateDataForDB( req.body.task_name );
    let formattedAssignedTo = manipulateDataForDB( req.body.assigned_to );

    const queryString = `UPDATE tasks SET task_name = ${formattedTaskName},
                                          assigned_to = ${formattedAssignedTo}
                         WHERE id = ${req.params.id};`;
    pool.query( queryString ).then( ( results )=>{
        res.sendStatus( 200 );
    }).catch( ( error )=>{
        console.log( `PUT error is:`, error );
        res.sendStatus( 500 );
    })
})

module.exports = router;