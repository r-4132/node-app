import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import StarRating from '../components/StarRating';
import Comment from '../components/Comment'
import '../assets/Pages.css'
import { Container, BookmarkButton, Card, IngredientsContainer, Image} from '../assets/Style' 



function Recipe() 
{
  let params = useParams(); // will extract name from url
  const [ingredients, setIngredients] = useState({}); // 
  const [bookmarked, setBookmarked] = useState(false);
  const [recipeName, setRecipeName] = useState(''); //Comment component will be able to have acces to recipe id or name with this state
  const [recipeImage, setRecipeImage] = useState('');

  const fetchRecipes = async() => // I wanted to try different ways to fetch data from api.
  {
    const data = await fetch(
      `http://localhost:8000/api/v1/recipes/recipe/${params.name}`
    );
    
    const ingredientsData = await data.json();

    setIngredients(ingredientsData.recipe.ingredients);
    setRecipeName(ingredientsData.recipe.name);
    setRecipeImage(ingredientsData.recipe.image);
    // console.log(ingredientsData);
    console.log(ingredientsData.recipe._id)
    

  };

  useEffect(() => // fetc recipe data whenever params.name changes
  {
    fetchRecipes();
  }, [params.name]);


  const handleBookmark = () => 
  {
    const bookmarkedRecipes = JSON.parse(localStorage.getItem("bookmarkedRecipes")) || []; // if nothing is stored in "bookmarkedRecipes", the fallback value || [] will assigns it to an empty array 
     
    if (bookmarkedRecipes.find(recipe => recipe._id === ingredients._id)) 
    {
      const filteredRecipes = bookmarkedRecipes.filter(recipe => recipe._id !== ingredients._id); // filter out the and find the recipe that matches the current ingredients.id
      localStorage.setItem("bookmarkedRecipes", JSON.stringify(filteredRecipes)); // save it to filteredRecipes that is being converted to JSON STRING BY JSON.stringify in order to be stored as a text
      setBookmarked(false);
    } 
    else 
    {
      bookmarkedRecipes.push(ingredients); // pushed to the bookmarkedRecipes array 
      localStorage.setItem("bookmarkedRecipes", JSON.stringify(bookmarkedRecipes)); //updated array is stored in the local storage, essential removing it from the local storage
      setBookmarked(true);
    }
  }
  
  
  return (
    <Container>
      <Card>
        <h1 className='ingredients_title'>{recipeName}</h1>
        <Image><img src={recipeImage} alt={ingredients.title} /></Image>
        <h3>Directions</h3>
        {/* dangerouslySetInnerHTML the render out the html code from the api */}
        <br></br>
        <p dangerouslySetInnerHTML={{__html: ingredients.instructions}}></p>
      <br></br>

      <IngredientsContainer>
        {
          Object.entries(ingredients).map(([ingredient, amount]) => //returns the object and the value as an array
          <li key={ingredient}>{ingredient}: {amount}</li>)
        }
      </IngredientsContainer>
      {bookmarked ? ( <BookmarkButton onClick={handleBookmark}>Remove</BookmarkButton> ) : ( <BookmarkButton onClick={handleBookmark}>Bookmark</BookmarkButton> )}
      <StarRating recipeName={recipeName} />
      <Comment recipeId={params.id} />
      
        </Card>


    </Container>
  )
}

export default Recipe;
