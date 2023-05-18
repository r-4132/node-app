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
      const response = await axios.get('http://localhost:8000/api/v1/recipes/comments');
      setComments(response.data.comments);
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
      rating: 0 
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

  return (
    <div>
      <form onSubmit={handleCommentSubmit}>
      <input type="text" value={name} onChange={(event) => setName(event.target.value)} placeholder="Name" required />
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" required />
        <textarea value={comment} onChange={(event) => setComment(event.target.value)}></textarea>
        <button type="submit">Add Comment</button>
      </form>
      <ul>
        {
          comments.filter(filter => filter.recipeName === props.recipeName).map((comment, index) => //this will filter out comments that are made in that specific recipe name
          (
            <div key={index}>{comment.commentText}</div>
          )
        )}
      </ul>
    </div>
  );
}

export default Comment;
