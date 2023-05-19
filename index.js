//import express from 'express';
var express = require('express')
var app     = express();
var cors = require('cors') ;
//import {find, create, findOne, update, all} from './dal.js';
const {find, create, findOne, update, all } = require('./dal');


// used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());

// create user account
app.get('/account/create/:name/:email/:password', function (req, res) {

    // check if account exists
    find(req.params.email).
        then((users) => {

            // if user exists, return error message
            if(users.length > 0){
                console.log('User already in exists');
                res.send('User already in exists');    
            }
            else{
                // else create user
                create(req.params.name,req.params.email,req.params.password).
                    then((user) => {
                        console.log(user);
                        res.send(user);            
                    });            
            }

        });
});


// login user 
app.get('/account/login/:email/:password', function (req, res) {
    

    find(req.params.email)
        .then((user) => {

            // if user exists, check password
            if(user.length > 0){
                if (user[0].password === req.params.password){
                    const token = sign({ userId: user.email }, process.env.JWT_SECRET);
                    res.json({token, user });
                    
                }
                else{
                    res.send('Login failed: wrong password');
                }
                
            }
            else{
                res.send('Login failed: user not found');
            }
            
    });
    
});

// find user account
app.get('/account/find/:email', function (req, res) {

    find(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});

// find one user by email - alternative to find
app.get('/account/findOne/:email', function (req, res) {

    findOne(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});


// update - deposit/withdraw amount
app.get('/account/update/:email/:amount', function (req, res) {

    var amount = Number(req.params.amount);

    update(req.params.email, amount).
        then((response) => {
            console.log(response);
            res.send(response);
    });    
});

// all accounts
app.get('/account/all', function (req, res) {

    all().
        then((docs) => {
            console.log(docs);
            res.send(docs);
    });
});

var port = 3000;
app.listen(port);
console.log('Running on port: ' + port);