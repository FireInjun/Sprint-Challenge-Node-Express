const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const actions = require( './data/helpers/actionModel' );
const projects = require( './data/helpers/projectModel' );
const CORS = require( 'cors' );

const port = 8080
const server = express();

server.use( express.json() );
server.use( bodyParser.json() );
server.use( bodyParser.urlencoded( { extended: true } ) );
server.use( CORS() );



server.listen( port, () =>
{
    console.log( `Server listening on port ${ port }` );
} )
