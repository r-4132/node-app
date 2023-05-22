const express = require('express');
const router = express.Router();
const User   = require('../models/UserModel');
const bcrypt = require('bcrypt');

router.get('/:userid', (request, response) => 
{
    User.findOne({ _id: request.params.userid })
    .then( dbResponse => 
    {
        response.status( 200 ).send({ user: dbResponse.username });
    });
});

router.post('/register', (request, response) => 
{

    User.find({ $or: [ { email: request.body.email }, { username: request.body.username }] })
    .then(dbResponse =>
        {
            if(dbResponse.length > 0)
            {
                response.status( 400 ).send({ error: 'Username and email is taken.' });
            }
            
            else
            {
                bcrypt.hash( request.body.password, 10 )
                .then((hash, err) =>
                {
                    const newUser = new User({ email: process.env.EMAIL, username: request.body.username});
                    newUser.password = hash;
                    newUser.save().then( data => 
                        {
                            console.log( data );
                            response.status( 201 ).send({  message: "User created" });
                        });

                })
            }
        })
    

});

router.post('/login', (request, response) =>
{
    User.findOne({ username: request.body.username }).then( dbResponse => 
        {
            bcrypt.compare( request.body.password, dbResponse.password )
            .then( isValid => 
            {
                if( !isValid )
                {
                    response.status( 404 ).send({ error: 'Invalid credentials' });
                }
                else
                {
                    response.status( 200 ).send({ message: "Login success!" });
                }
            });
        });
})

module.exports = router;