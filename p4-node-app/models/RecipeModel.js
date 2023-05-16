const mongoose = require('mongoose');

const RecipeSchema = mongoose.Schema({
    name: String,
    image: String,
    dish: String,
    meal: [String],
    diet: [String],
    ingredients: String,
    intructions: String
    
});

module.exports = mongoose.model('Recipe',RecipeSchema)
