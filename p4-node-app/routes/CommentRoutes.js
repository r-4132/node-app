const express = require('express');
const router = express.Router();
const Comment = require('../models/CommentModel');



router.post('/comment', (request, response) =>
{
    const { name, content, rating } = request.body;
    const email = process.env.EMAIL;

    if(!name || !email)
    {
        return response.status(400).send({erro: "Name and email are required"});
    }
    const comment = new Comment(
        {
            name,
            email,
            content,
            rating
        }
    );

    comment.save()
    .then(saveComment =>
        {
            response.status(200).send({comment: saveComment});
        })
    .catch(error => 
        {
            response.status(404).send({error: 'no comment'})
        })

})
router.delete('/comment/:id', (request, response) =>
{
    const commentId = request.params.id;
    const rating = request.body;
    
    Comment.findByIdAndUpdate(commentId,  { deleted: true }, { new: true }, rating)
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


router.put('/comment/:id', (request, response) =>
{
    const commentId = request.params.id;
    const{content, rating} = request.body;

    Comment.findById(commentId)
    .then(comment =>
        {
            if(!comment)
            {
                return response.status(400).send({error:'comment not found'});
            }
            comment.content = content;
            comment.rating = rating;
            return comment.save();
        })

    .then(updateComment =>
        {
            response.status(200).send({comment:updateComment});
        }) 
    .catch(error =>
        {
            response.status(400).send({ error: 'Failed to update comment' });
        })


})

  

module.exports = router;