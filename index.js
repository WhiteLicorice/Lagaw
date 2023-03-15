/*
    This is a web application developed by Rene Andre Jocsing, Ron Gerlan Naragdao, Laviele Trias, and Chancy Ponce de Leon in partial fulfillment of the requirements of the course Software Engineering II A.y. 2022 – 2023.
    Date Created: February 25, 2023
*/

/* Environment Variables */
    //  Abstracted away in .env -> install via "npm install dotenv" then create a ".env" file in your root directory -> add port and API_KEY variables 
require('dotenv').config();
// Port value

/* Main Code */

// Importing of ExpressJS
var express = require('express');

// Creating ExpressJS app
var app = express();

// Set view engine as EJS
app.set('view engine', 'ejs');

// App uses files under public folder (under construction)
app.use(express.static(__dirname + '/public'));

// Get request from route '/' and callback function request(req) and response(res)
// req represents the HTTP request
// res represents the HTTP response
app.get('/', function(req,res)
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
    res.render('pages/traffic', {API_KEY: process.env.API_KEY});
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
app.listen(process.env.port);
console.log('Server is active on port ' + process.env.port + '.');
