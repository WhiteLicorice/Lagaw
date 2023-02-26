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
var exprs = require('express');

// Creating ExpressJS app
var app = exprs();

// Set view engine as EJS
app.set('view engine', 'ejs');

// App uses CSS (under construction)
app.use("/css",exprs.static(__dirname + "/css"));

// Get request from route '/' and callback function request(req) and response(res)
// req represents the HTTP request
// res represents the HTTP response
app.get('/', function(req,res)
{
    // HTTP render response
    //res.render('pages/home');
    res.render('pages/home');
});

// Binds and listens for connection on specified host and port.
// Full syntax: app.listen(port, [host], [backlog], [callback]])
app.listen(port);
console.log('Server is active on port ' + port + '.');