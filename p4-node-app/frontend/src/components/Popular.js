import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function Popular() 
{
  const [popularRecipes, setPopularRecipes] = useState([]); // initialized to an empty array []
  

  useEffect(() =>
  {
    getPopularRecipes();
    
  },[]);
  const getPopularRecipes  = async () =>
  {
    const checkLocal = localStorage.getItem('popular'); // prevents data from fetching always if theres is local storage

    if(checkLocal) // if there is local storage, no need to fetch datajust load what's inside local storage
    {
      setPopularRecipes(JSON.parse(checkLocal));
    }
    else
    {
      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=8`) // ctrl + c (This is 1 week older Renee, I forgot what this comment means) when implementing .env, env. it's a way to hide api key.
      const data = await api.json(); 
      setPopularRecipes(data.recipes)
      
      localStorage.setItem('popular', JSON.stringify(data.recipes));
    }
  };
  return (
    <>
    
      <h2>Popular Recipes</h2>
    <div id='recipes_container'>
      {
        popularRecipes.map(recipes =>
          {
            return(
              <div id='recipes_card' key={recipes.id}>
                <Link to={`/recipe/${recipes.id}`}>
                <img id='img_recipe' src={recipes.image} alt={recipes.title} />
                <p id='recipes_title'>{recipes.title}</p>
                </Link>
              </div>

            );
          })
      }
    </div>
    </>
  )
}

export default Popular;