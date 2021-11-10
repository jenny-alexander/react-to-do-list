//requires
const express = require( 'express' );
const app = express();
const todo = require( './routes/todo.route' );
const bodyParser = require( 'body-parser' );
const path = require( 'path' );

//uses
app.use( bodyParser.urlencoded( { extended:true } ) );
app.use( bodyParser.json() );
app.use( '/todo', todo );

//Use this for heroku
if ( process.env.NODE_ENV === 'production' ) {
    app.use( express.static( 'build' ) );

    app.get('*', ( req, res )=> {
        res.sendFile( path.join(__dirname, 'build', 'index.html' ) ) ; //relative path
    })
}

//global
const PORT = process.env.PORT || 5001;

//spin up server
app.listen( PORT, ()=>{
    console.log( `server up on:`, port );
});
