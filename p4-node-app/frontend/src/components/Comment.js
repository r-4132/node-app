import React, { useState, useEffect } from 'react'
import axios from 'axios';

function Comment(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  useEffect(() =>
  {
    fetchComments();

  },[])

  const fetchComments = async () =>
  {
    try
    {
      const response = await axios.get('http://localhost:8000/api/v1/recipes/comment');
      setComments(response.data.comments);
      console.log(response.data.comments);
    }
    catch (error)
    {
      console.error('Failed to fetch comments:', error);

    }
  }

  const handleCommentSubmit = async (event) => 
  {
    event.preventDefault();

    const newComment = 
    {
      name,
      email,
      content: comment,
      rating: 0,
      recipeId:props.recipeId
    };


    try
    {
      const response = await axios.post('http://localhost:8000/api/v1/recipes/comment', newComment);
      const updatedComments = [...comments, response.data.comment];
      setComments(updatedComments);
      setName('');
      setEmail('');
      setComment('');
    }

    catch (error)
    {
      console.error('Failed to fetch comments:', error);

    }


  }
  // console.log('props.recipeId:', props.recipeId);


  return (
    <div>
      <form onSubmit={handleCommentSubmit}>
      <input type="text" value={name} onChange={(event) => setName(event.target.value)} placeholder="Name" required />
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" required />
        <textarea value={comment} onChange={(event) => setComment(event.target.value)}></textarea>
        <button type="submit">Add Comment</button>
      </form>
      <ul>
        {comments
          .filter((comment) => comment.recipeId === props.recipeId) // Modify the filter condition
          .map((comment, index) => (
            <div key={index}>{comment.content}</div>
          ))}
      </ul>
    </div>
  );
}

export default Comment;
