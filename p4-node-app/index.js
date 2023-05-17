const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const server = express();
const PORT   = 8000;
const baseURL = "/api/v1/recipes";

mongoose.connect('mongodb://127.0.0.1:27017/recipedb');
const RecipeRoutes = require('./routes/RecipeRoutes')
const RateRoutes = require('./routes/RateRoutes')
const CommentRoutes = require('./routes/CommentRoutes')

server.use( bodyParser.json() ); 
server.use( cors() ); 
server.use( baseURL, RecipeRoutes );
server.use( baseURL, RateRoutes );
server.use( baseURL, CommentRoutes );

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Compass: Connection is open')
})



server.listen( PORT, () => { console.log(`Server is running on port ${PORT}`); })