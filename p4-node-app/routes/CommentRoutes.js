const express = require('express');
const router = express.Router();
const Comment = require('../models/CommentModel');

router.post('/comment', (request, response) =>
{
    const { name, email, content } = request.body;

    if(!name || !email)
    {
        return response.status(400).send({erro: "Name and email are required"});
    }
    const comment = new Comment(
        {
            name,
            email,
            content
        }
    );

    comment.save()
    .then(saveComment =>
        {
            response.status(200).send({comment: saveComment});
        })
    .catch(error => 
        {
            response.status(404).send({error: 'meal is not found'})
        })

})

router.delete('/comment/:id', (request, response) =>
{
    const commentId = request.params.id;
    Comment.findByIdAndDelete(commentId)
    .then(deleteComment =>
        {
            if(!deleteComment)
            {
                return response.status(400).send({error: "Commentnot found"});
            }
            response.status(200).send({ message: 'Comment deleted successfully' });
        })
    .catch(error =>
        {
            response.status(400).send({error: 'failed to delete comment'});
        });
});


  

module.exports = router;