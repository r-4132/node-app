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



  const handleDelete = async (commentId) =>
  {
    try
    {
      await axios.delete(`http://localhost:8000/api/v1/recipes/comment/${commentId}`);
      const updatedComments = comments.filter((comment) => comment._id !== commentId);
      setComments(updatedComments);
    }
    catch (error)
    {
      console.error('Failed to delete comment:', error);

    }
  }

  const handleEdit = async (commentId) =>
  {
    const updatedContent = prompt('Enter the updated comment content:');
    if (updatedContent)
    {

      try
      {
        await axios.put(`http://localhost:8000/api/v1/recipes/comment/${commentId}`, { content: updatedContent });
        const updatedComments = comments.filter((comment) => 
        {
          if (comment._id === commentId)
          {
            comment.content = updatedContent;

          }
          return comment;
        })
        setComments(updatedComments);
      }
      catch (error)
      {
        console.error('Failed to delete comment:', error);
  
      }
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
        {comments
          .filter((comment) => comment.recipeId === props.recipeId && comment.deleted === false) // filter comments that are made in that recipe page 
          .map((comment, index) => (
            <div key={index}>
              {comment.content}
              {comments.length > 0 && 
              (
                <div>
                  <button onClick={() => handleDelete(comment._id)}>Delete</button>
                  <button onClick={() => handleEdit(comment._id)}>Edit</button>

                </div>
              )}
            </div>
          ))}
          {comments.length === 0 && <div>No comments yet.</div>}
      </ul>
    </div>
  );
}

export default Comment;
