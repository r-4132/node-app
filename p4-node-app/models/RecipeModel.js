const mongoose = require('mongoose');

const RecipeSchema = mongoose.Schema({
    name: String,
    image: String,
    dishType: String,
    meal: [String],
    diet: [String],
    ingredients: String,
    intructions: String
    
});

module.exports = mongoose.model('recipe',RecipeSchema)
