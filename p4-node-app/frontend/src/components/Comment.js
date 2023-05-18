import React, { useState } from 'react'

function Comment(props) {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(JSON.parse(localStorage.getItem("comments")) || []); // load comments from local storage or assign an empty array if there are no comments

  const handleCommentSubmit = (event) => 
  {
    event.preventDefault();

    const newComment = 
    {
      recipeName: props.recipeName, //  set to the value of the recipeName prop from Recipe.js
      commentText: comment
    }

    const updatedComments = [...comments, newComment]; // add new comment to existing comments
    localStorage.setItem("comments", JSON.stringify(updatedComments)); // save updated comments to local storage
    setComments(updatedComments); // update state with new comments
    setComment(''); // reset comment input field
  }

  return (
    <div>
      <form onSubmit={handleCommentSubmit}>
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
