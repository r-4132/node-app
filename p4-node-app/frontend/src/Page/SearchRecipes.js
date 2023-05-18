import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SearchBox, Card,ContainerTypes ,DietTypes  } from "../assets/Style";




const SearchRecipes = () => 
{
  const [searchInput, setSearchInput] = useState('');
  const [meal, setMeal] = useState([]);
  const [diet, setDietTypes] = useState([]);
  const [dish, setDishTypes] = useState([]);
  

  const navigate = useNavigate(); // from react-router-dom library

  const handleSearch = async (event) => 
  {
    event.preventDefault();

    try{
      const ingredientsArray = searchInput.split(' '); // will split up ingredients typed by the user into spaces
      

      const response = await axios.get('http://localhost:8000/api/v1/recipes/ingredients', 
      {
          params: {
              ingredients: ingredientsArray.join(','), // this will join the by comma which is required by the url
              diet: diet.join(','), // this will join the by comma which is required by the url
              dish: dish.join(','), // this will join the by comma which is required by the url
              meal: meal.join(','), // this will join the by comma which is required by the url
              // number: 8, // limit number of results to 10
              // ranking: 1, // prioritize results with most missing ingredients
            }
          });
          console.log(response.data)
          navigate(`/search-results/${searchInput}`, { state: { results: response.data.recipes } }); //the first arguement will replace the url base on what the user input, the 2nd argument, state has the value of results w/c another object with a property w/c also has a value of response.data
    } 

    catch (error)
    {
      console.log(error)

    }
};
const mealList =  //array of dishes
[
  'Breakfast',
  'Lunch',
  'Dinner',

];

const dietTypesList =
[
  'Gluten Free',
  'Keto',
  'Vegetarian',
  'No eggs',
  'Dairy Free',
  'Vegan',
  'Pescetarian',
  'Paleo',
  'Primal',
  'Low FODMAP',
  'Whole30'
  
]

const handleCheckboxChange = (set) => (event) => //to my understanding this is a higher-order function t omake the funtion dynamic. it takes in a set function as an argument and returns a new function that takes in an event objec
{
  const isChecked = event.target.checked;
  const value = event.target.value;

  if (isChecked) 
  {
    set((state) => [...state, value]);
  } 
  
  else 
  {
    set((state) => state.filter((type) => type !== value));
  }
};

const handleMeal = handleCheckboxChange(setMeal);
const handleDietTypes = handleCheckboxChange(setDietTypes);

return (
  <>
  
      <SearchBox onSubmit={handleSearch}>
        <label>
          Search ingredients:
          <input type="text" value={searchInput} onChange={(event) => setSearchInput(event.target.value)} />
          <button type="submit">Search</button>
        </label>

          </SearchBox>
        <ContainerTypes>
          <Card>
            <cuisine>
          <p>Filter by Meal</p>
          {mealList.map((type, index) => ( // looping over dishtypes
            <label key={index}>
            <input type="checkbox" value={type} onChange={handleMeal} />
            {type}
          </label>
          
          ))}
            </cuisine>

            <DietTypes>
          <p>Filter by Diet:</p>
          {dietTypesList.map((type, index) => ( // looping over dishtypes
            <label key={index}>
            <input type="checkbox" value={type} onChange={handleDietTypes} />
            {type}
          </label>
          
          ))}
            </DietTypes>
          </Card>
        </ContainerTypes>

    </>
);
};

export default SearchRecipes;
