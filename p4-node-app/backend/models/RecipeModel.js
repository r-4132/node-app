const mongoose = require('mongoose');

const RecipeSchema = mongoose.Schema({
    name: String,
    image: String,
    dish: String,
    meal: [],
    diet: [],
    ingredients: {},
    intructions: {}
    
});

module.exports = mongoose.model('Recipe',RecipeSchema)
