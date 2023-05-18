import React, { useReducer, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

const initialState = { rating: null }; //initialization. Set the value of rating to null

function reducer(state, action) 
{
  switch (action.type) 
  {
    case 'SET_RATING':
      return { //this is basically where the new rating value is being updated
        rating: action.payload //payload is used to pass the new rating value
    };

    case 'UPDATE_RATING': // reducer updates the local storage
      const ratings = JSON.parse(localStorage.getItem('ratings')) || {}; // same as hand
      ratings[action.recipeName] = action.payload;
      localStorage.setItem('ratings', JSON.stringify(ratings));
      return {
        rating: action.payload
      };
    default:
      return state;
  }
}

function StarRating({ recipeName }) 
{
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => 
  {
    const ratings = JSON.parse(localStorage.getItem('ratings')) || {};
    const rating = ratings[recipeName]; // useEffect retrieves data by using recipeName as key
    if (rating) 
    {
      dispatch({ type: 'SET_RATING', payload: rating }); // this triggers reducer to update 
    }
  }, [recipeName]);

  return (
    <div>
      {[...Array(5)].map((star, i) => // this will basically print out 5 stars
      {
        const ratingValue = i + 1; // this will represent the value of the star. 2 = two stars

        return (
          <label key={i}>
            <input
              id="star_rad"
              type="radio"
              name={`rating_${recipeName}`}
              value={ratingValue}
              onChange={() => dispatch({ type: 'UPDATE_RATING', payload: ratingValue, recipeName })}
            />
            <FaStar
              id="star"
              color={ratingValue <= state.rating ? '#ffc107' : '#555555'}
              size={30}
            />
          </label>
        );
      })}
    </div>
  );
}

export default StarRating;
