//requires
const express = require( 'express' );
const app = express();
const todo = require( './routes/todo.route' );
const bodyParser = require( 'body-parser' );

//uses
app.use( bodyParser.urlencoded( { extended:true } ) );
app.use( bodyParser.json() );
app.use( '/todo', todo );

//global
const port = 5001;

//spin up server
app.listen( port, ()=>{
    console.log( `server up on:`, port );
});
