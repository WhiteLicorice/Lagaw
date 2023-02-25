/*
    Index.js for LAGAW Web App

    Created by: Ron Gerlan F. Naragdao
    Date Created: February 25, 2023
*/



// Importing of ExpressJS
var exprs = require('express');

// Creating ExpressJS app
var app = exprs();

// Get request from route '/' and callback function request(req) and response(res)
// req represents the HTTP request
// res represents the HTTP response
app.get('/', function(req,res)
{
    // HTTP send response
    res.send("Hello world!");
});

// Binds and listens for connection on specified host and port.
// Port here is 3000. Might change in the future.
// Full syntax: app.listen(port, [host], [backlog], [callback]])
app.listen(3000);