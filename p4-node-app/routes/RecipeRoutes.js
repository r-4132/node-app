const express = require('express');
const router = express.Router();
const Recipe = require('../models/RecipeModel');


router.get( '/recipeList', ( request, response ) => 
{
    Recipe.find().then(recipe =>
        {
            response.status(200).send({recipes:recipe});
        })
        .catch(error =>
            {
                response.status(500).send({error: error.message});
            });
});



module.exports = router;