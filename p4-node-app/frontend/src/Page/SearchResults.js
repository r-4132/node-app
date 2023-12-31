import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
const SearchResults = () => 
{
  const location = useLocation(); //useLocation is use to get the object that contains information about the current URL path and query string.

  const { results } = location.state; // this is to destructurize (I'm not sure if that's a word) and store {results} and make assign new variable to results
  if (!results || results.length === 0) {
    return <h1>No recipes found</h1>;
  }
  return (
    <div id='recipe_container'>
      {
        results.map((recipe) => //iterate each recipes found 
        {
            return(
            <div id='recipes_card' key={recipe._id}>
                <Link to={`/recipe/${recipe._id}`}>  
                {/* Link is to redirect page to a new one */}
                  <img src={recipe.image} alt={recipe.name} id="image_recipe" />
                  <p id='recipes_title'>{recipe.name}</p>
                </Link>
            </div>
            )
        })
      }
    </div>
  );
};

export default SearchResults;
