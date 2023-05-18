import React from "react";
import { Link } from "react-router-dom";
import '../assets/Pages.css'



const Bookmarks = () => {

  const bookmarkedRecipes = JSON.parse(localStorage.getItem("bookmarkedRecipes")) || []; // // if nothing is stored in "bookmarkedRecipes", the fallback value || [] will assigns it to an empty array 

  return ( // this just basically display data stored in the local storage
    <>
    <div id='recipes_container'>
      
      {bookmarkedRecipes.map(recipe => (
        <div id='recipes_card' key={recipe.id}>
          <Link  to={`/recipe/${recipe.id}`}>
            <h3 id='recipes_title'>{recipe.title}</h3>
            <img id='img_recipe' src={recipe.image} alt={recipe.title} />
          </Link>
        </div>
      ))}

      
    </div>
    </>
  )
}

export default Bookmarks;
