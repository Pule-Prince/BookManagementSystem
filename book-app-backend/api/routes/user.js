const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const User =require('../../models/user');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');


// Endpoint that creates a user
router.post("/signup", (req, res, next) => {
    //check if email already exists
    console.log(req.body.email);
    User.find({email: req.body.email})
    .exec().then(user => {
        if(user.length >= 1){
            return res.status(409).json({
                message: "Email already exists"
            });
        }
        else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err){
                    return res.status(500).json({
                        error: err
                    })
                }
                else
                {
                    //creating an instance of the user model
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email:req.body.email,
                        password: hash,
                        name:req.body.name,
                        user_type: 'user'
                    })
                    user.save()
                    .then(result => {
                        res.status(201).json({
                            message: 'User created successfully'
                        });
                    })
                    .catch(err => {
                        res.status(500).json({
                            message: 'Failed to create user',
                            error: err
                        });
                    });
                }
            })
        }
    })
})

// Endpoint that creates a admin
router.post("/admin-signup", (req, res, next) => {
    console.log(req.body.email);
    User.find({email:req.body.email})
    .exec().then(user => {
        if(user.length > 1){
            return res.status(409).json({
                message: "Email already exists"
            });
        }
        else{
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err) {
                    return res.status(500).json({
                        error: err
                    })
                }
                else{
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email:req.body.email,
                        password:hash,
                        name :req.body.name,
                        user_type:'admin'
                    })
                    user.save()
                    .then(result => {
                        res.status(201).json({
                            message: "Admin successfully created"
                        });
                    })
                    .catch(err => {
                        res.status(500).json({
                            message: "Admin creation failed",
                            error: err
                        });
                    });
                }
            })
        }
    })
})

// Endpoint to login a user
router.post("/login", (req, res, next) => {
    console.log(req.body.email);
    console.log(req.body.password);
    User.find({email:req.body.email})
    .exec()
    .then(user => {
        if(user.length < 1) {
            return res.status(401).json({
                message: "Auth failed"
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if(err){
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            if(result){
                const token = jwt.sign({
                    email:user[0].email,
                    userId: user[0]._id
                },
                'secret',
                {
                    expiresIn:"1h"
                }
                )
                return res.status(200).json({
                    message: "Auth successful",
                    user_type:user[0].user_type,
                    token: token
                });
            }
            res.status(401).json({
                message: "Auth failed"
            });
        })
    })
    .catch(err => {
        res.status(500).json({
            error:err
        });
    });
});

module.exports = router;