/*
    Index.js for LAGAW Web App

    Created by: Ron Gerlan F. Naragdao
    Date Created: February 25, 2023
*/

/* Environment Variables */

// Port value
port = 8080







/* Main Code */

// Importing of ExpressJS
var express = require('express');

// Creating ExpressJS app
var app = express();

// Set view engine as EJS
app.set('view engine', 'ejs');

// App uses CSS (under construction)
app.use(express.static(__dirname + '/public'));

// Get request from route '/' and callback function request(req) and response(res)
// req represents the HTTP request
// res represents the HTTP response
app.get('/home', function(req,res)
{
    // HTTP render response
    //res.render('pages/home');
    res.render('pages/home');
});

app.get('/places-and-landmarks', function(req,res)
{
    // HTTP render response
    //res.render('pages/home');
    res.render('pages/places-and-landmarks');
});

app.get('/culture-and-festivals', function(req,res)
{
    // HTTP render response
    //res.render('pages/home');
    res.render('pages/culture-and-festivals');
});

app.get('/food', function(req,res)
{
    // HTTP render response
    //res.render('pages/home');
    res.render('pages/food');
});

app.get('/accommodation', function(req,res)
{
    // HTTP render response
    //res.render('pages/home');
    res.render('pages/accommodation');
});

app.get('/traffic', function(req,res)
{
    // HTTP render response
    //res.render('pages/home');
    res.render('pages/traffic');
});

app.get('/settings', function(req,res)
{
    // HTTP render response
    //res.render('pages/home');
    res.render('pages/settings');
});

app.get('/user', function(req,res)
{
    // HTTP render response
    //res.render('pages/home');
    res.render('pages/user');
});


// Binds and listens for connection on specified host and port.
// Full syntax: app.listen(port, [host], [backlog], [callback]])
app.listen(port);
console.log('Server is active on port ' + port + '.');