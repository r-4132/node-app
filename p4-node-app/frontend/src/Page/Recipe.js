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

  const fetchRecipes = async() => // I wanted to try different ways to fetch data from api.
  {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
    );
    
    const ingredientsData = await data.json();
    setIngredients(ingredientsData);
    setRecipeName(params.name);
    console.log(ingredientsData);
    

  };

  useEffect(() => // fetc recipe data whenever params.name changes
  {
    fetchRecipes();
  }, [params.name]);


  const handleBookmark = () => 
  {
    const bookmarkedRecipes = JSON.parse(localStorage.getItem("bookmarkedRecipes")) || []; // if nothing is stored in "bookmarkedRecipes", the fallback value || [] will assigns it to an empty array 
     
    if (bookmarkedRecipes.find(recipe => recipe.id === ingredients.id)) 
    {
      const filteredRecipes = bookmarkedRecipes.filter(recipe => recipe.id !== ingredients.id); // filter out the and find the recipe that matches the current ingredients.id
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
        <h1 className='ingredients_title'>{ingredients.title}</h1>
        <Image><img src={ingredients.image} alt={ingredients.title} /></Image>
        <h3>Directions</h3>
        {/* dangerouslySetInnerHTML the render out the html code from the api */}
        <br></br>
        <p dangerouslySetInnerHTML={{__html: ingredients.instructions}}></p>
      <br></br>

      <IngredientsContainer>
        {
          ingredients.extendedIngredients && ingredients.extendedIngredients.map((items) => ( //define ingredients.extendedIngredients to prevent error
          <li key ={items.id}>{items.original}</li>
          ))
        }
      </IngredientsContainer>
      {bookmarked ? ( <BookmarkButton onClick={handleBookmark}>Remove</BookmarkButton> ) : ( <BookmarkButton onClick={handleBookmark}>Bookmark</BookmarkButton> )}
      <StarRating recipeName={recipeName} />
      <Comment recipeName={recipeName} />
        </Card>


    </Container>
  )
}

export default Recipe;
