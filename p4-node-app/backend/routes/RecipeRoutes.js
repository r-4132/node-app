const express = require('express');
const router = express.Router();
const Recipe = require('../models/RecipeModel');


router.get( '/recipe/:id', ( request, response ) => 
{
    const recipeId = request.params.id;
    Recipe.findById(recipeId)
    .then(recipe =>
        {
            if(!recipe)
            {
                return response.status(404).send({ error: "Recipe not found" });
            }
            response.status(200).send({recipe:recipe});
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

router.get('/search', (request, response) => 
{
    const { ingredients, diet, dish, meal } = request.query;
    const query = {};
  

    if (ingredients) 
    {
      const ingredientList = ingredients.split(',');
      
      query.$and = ingredientList.map((ingredient) => 
      ({
        [`ingredients.${ingredient}`]: { $exists: true },
      }));
    }
  
    if (diet) 
    {
      query.diet = { $regex: new RegExp(diet, 'i') };
    }
  
    if (dish) 
    {
      query.dish = { $regex: new RegExp(dish, 'i') };
    }
  
    if (meal) 
    {
      query.meal = { $regex: new RegExp(meal, 'i') };
    }
  
    Recipe.find(query)
      .then((recipes) => 
      {
        response.status(200).send({ recipes });
      })
      .catch((error) => 
      {
        response.status(404).send({ error: 'Recipes not found' });
      });
  });
  


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