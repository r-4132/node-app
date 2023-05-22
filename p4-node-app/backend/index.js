const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet')
require('dotenv').config();

const server = express();
const PORT   = 8000;
const baseURL = "/api/v1/recipes";

// mongoose.connect('mongodb://127.0.0.1:27017/recipedb');
mongoose.connect('mongodb+srv://rrtanoco:recipe123@recipe.432h2xn.mongodb.net/recipedb');

const RecipeRoutes = require('./routes/RecipeRoutes')
const RateRoutes = require('./routes/RateRoutes')
const CommentRoutes = require('./routes/CommentRoutes')
const UserRoutes = require('./routes/UserRoutes')

server.use( bodyParser.json() ); 
server.use( cors() ); 
server.use( baseURL, RecipeRoutes );
server.use( baseURL, RateRoutes );
server.use( baseURL, CommentRoutes );
server.use( baseURL, UserRoutes );
server.use(helmet());

server.get('/', ( request, response ) => 
{
    response.status(200).send(`Welcome to Express App`);
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Compass: Connection is open')
})



server.listen( PORT, () => { console.log(`Server is running on port ${PORT}`); })