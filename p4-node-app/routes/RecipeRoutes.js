const express = require('express');
const router = express.Router();
const Recipe = require('../models/RecipeModel');


router.get( '/recipeList', ( request, response ) => 
{
    Recipe.find()
    .then(recipe =>
        {
            response.status(200).send({recipes:recipe});
        })
    .catch(error =>
        {
            response.status(500).send({error: error.message});
        });
});

router.get('/ingredients', (request, response) =>
{
    const ingredients = request.query.ingredients.split(','); 
    const findIng = { $and: ingredients.map(ingredient => ({ [`ingredients.${ingredient}`]: { $exists: true } })) }; // the equavalent of && that all ingredients input must be met and will acces object key and checks if it exist.

    Recipe.find(findIng)
    .then(ingredients =>
        {
            response.status(200).send({ingredients});
        })
    .catch(error =>
        {
            response.status(404).send({ error: 'Ingredients not found' });
        })
})


router.get('/diet/:diet', (request, response) =>
{
    const diet = request.params.diet;
    const regex = new RegExp(diet, 'i');
    Recipe.find({ diet: { $regex: regex } }) 
    .then(diets => 
        {
            response.status(200).send({diets});
        })
    .catch(error => 
        {
            response.status(404).send({error: 'diet is not found'})
        })
})

router.get('/meal/:meal', (request, response) =>
{
    const meal = request.params.meal;
    const regex = new RegExp(meal, 'i');
    Recipe.find({ meal: { $regex: regex } }) 
    .then(meals => 
        {
            response.status(200).send({meals});
        })
    .catch(error => 
        {
            response.status(404).send({error: 'meal is not found'})
        })
})

router.get('/dish/:dish', (request, response) =>
{
    const dish = request.params.dish;
    const regex = new RegExp(dish, 'i');
    Recipe.find({ dish: { $regex: regex } }) 
    .then(dishes => 
        {
            response.status(200).send({dishes});
        })
    .catch(error => 
        {
            response.status(404).send({error: 'meal is not found'})
        })
})



module.exports = router;