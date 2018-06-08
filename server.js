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


server.post( '/api/projects', ( req, res ) =>
{
    const { name, description, completed } = req.body;
    if ( !name || !description )
    {
        res.status( 404 ).json( { error: 'We need more info bruh.' } );
        return;
    }
    const newProject = { name, description, completed };
    projects
        .insert( newProject )
        .then( response =>
        {
            console.log( response );
            res.status( 201 ).json( response );
        } )
        .catch( err =>
        {
            res.status( 500 ).json( { error: 'No Bueno! Check your code...' } );
        } );
} );

server.get( '/api/projects', ( req, res ) =>
{
    projects
        .get()
        .then( projects => res.json( projects ) )
        .catch( err => res.status( 500 ).json( { error: 'Que Dice?' } ) );
} );

server.get( '/api/projects/:id', ( req, res ) =>
{
    const { id } = req.params;
    projects
        .get( id )
        .then( project => res.json( project ) )
        .catch( err =>
        {
            res.status( 500 ).json( { error: 'No Comprendo Hombre!' } );
        } );
} );

server.get( '/api/projects/:id/actions', ( req, res ) =>
{
    const { id } = req.params;
    projects
        .getProjectActions( id )
        .then( actions =>
        {
            res.json( actions )
        } )
        .catch( err =>
        {
            res.status( 500 ).json( { error: 'Que Dice?' } );
        } );
} );

server.put( '/api/projects/:id', ( req, res ) =>
{
    const { name, description, completed } = req.body;
    const updatedProject = { name, description, completed };
    if ( !name || !description )
    {
        res.status( 404 ).json( { error: 'I need more data!' } );
        return;
    }
    const { id } = req.params;
    projects
        .update( id, updatedProject )
        .then( response =>
        {
            res.json( response );
        } )
        .catch( err =>
            res.status( 400 ).json( { error: 'Cannot update that!' } )
        );
} );

server.delete( '/api/projects/:id', ( req, res ) =>
{
    const { id } = req.params;
    projects
        .remove( id )
        .then( response =>
        {
            if ( response == 0 )
            {
                res.status( 404 ).json( { error: 'That aint here.' } );
                return;
            }
            res.json( { success: 'Item removed from DB.' } );
        } )
        .catch( err =>
            res.status( 400 ).json( { error: 'No can do Hombre.' } )
        );
} );



server.post( '/api/actions', ( req, res ) =>
{
    const { project_id, description, completed, notes } = req.body;
    const newAction = { project_id, description, completed, notes }
    if ( !project_id || !description )
    {
        res.status( 404 ).json( { error: 'We need more info.' } );
        return;
    }
    actions
        .insert( newAction )
        .then( response =>
        {
            res.status( 201 ).json( response );
        } )
        .catch( err =>
        {
            res.status( 500 ).json( { error: 'Que Dice?' } );
        } );
} );

server.get( '/api/actions', ( req, res ) =>
{
    actions
        .get()
        .then( actions => res.json( actions ) )
        .catch( err => res.status( 500 ).json( { error: 'Que Dice?' } ) );
} );

server.get( '/api/actions/:id', ( req, res ) =>
{
    const { id } = req.params;
    actions
        .get( id )
        .then( action => res.json( action ) )
        .catch( err =>
        {
            console.log( err );
            res.status( 500 ).json( { error: 'Que Dice?' } );
        } );
} );

server.put( '/api/actions/:id', ( req, res ) =>
{
    const { project_id, description, notes } = req.body;
    const updatedAction = { project_id, description, notes };
    if ( !project_id || !description )
    {
        res.status( 404 ).json( { error: 'We need more info.' } );
        return;
    }
    const { id } = req.params;
    actions
        .update( id, updatedAction )
        .then( response =>
        {
            res.json( response );
        } )
        .catch( err =>
            res.status( 400 ).json( { error: 'No can do.' } )
        );
} );

server.delete( '/api/actions/:id', ( req, res ) =>
{
    const { id } = req.params;
    actions
        .remove( id )
        .then( response =>
        {
            if ( response == 0 )
            {
                res.status( 404 ).json( { error: 'That aint here.' } );
                return;
            }
            res.json( { success: 'You are the Weakest Link! Goodbye!' } );
        } )
        .catch( err =>
            res.status( 400 ).json( { error: 'Danger! Danger Will Robinson!' } )
        );
} );

server.listen( port, () =>
{
    console.log( `Server listening on port ${ port }` );
} )
