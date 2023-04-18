/*
    This is a web application developed by Rene Andre Jocsing, Ron Gerlan Naragdao, Laviele Trias, and Chancy Ponce de Leon in partial fulfillment of the requirements of the course Software Engineering II A.y. 2022 – 2023.
    Date Created: February 25, 2023
*/

/* Environment Variables */
    //  Abstracted away in .env -> install via "npm install dotenv" then create a ".env" file in your root directory -> add port and API_KEY variables 
require('dotenv').config();
// Port value

/* Main Code */

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://cmpdleon:iolmp4azZac7irwn@cluster0.8aellvw.mongodb.net/?retryWrites=true&w=majority";

const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const express = require('express');
const session = require('express-session');

// Creating ExpressJS app
var app = express();


// Set variable for urlencoded body
app.use(express.urlencoded({ extended: false}))

// Set view engine as EJS
app.set('view engine', 'ejs');

// App uses files under public folder (under construction)
app.use(express.static(__dirname + '/public'));

app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

const initializePassport = require('./passport-config');

initializePassport(
    passport,
    async function getUserbyName(username) {
        const client = new MongoClient(uri);
        const result = await client.db("Trial").collection("check1").findOne({ username: username });

        if (result) {
            console.log(`Found a listing in the collection with the name '${username}':`);
            console.log(result);
        } else {
            console.log(`No listings found with the name '${username}'`);
        }
        await client.close();
        return result;},
    
    async function getUserbyId(userId) {
        const client = new MongoClient(uri);
        const result = await client.db("Trial").collection("check1").findOne({ userId: userId });

        if (result) {
            console.log(`Found a listing in the collection with the name '${userId}':`);
            console.log(result);
        } else {
            console.log(`No listings found with the name '${userId}'`);
        }
        await client.close();
        return result;},
        
    );

// Get request from route '/' and callback function request(req) and response(res)
// req represents the HTTP request
// res represents the HTTP response
app.get('/', function(req,res)
{
    // HTTP render response
    //res.render('pages/home');
    res.render('pages/home');
});

app.get('/login', function(req,res)
{
    // HTTP render response
    //res.render('pages/home');
    res.render('pages/login');
});

app.get('/register', function(req,res)
{
    // HTTP render response
    //res.render('pages/home');
    res.render('pages/register');
});

app.get('/login', function(req,res)
{
    // HTTP render response
    //res.render('pages/home');
    res.render('pages/login');
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
    // res.render('pages/home');
    res.render('pages/user');
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

app.post('/register', async function(req,res)
{
    try {
        // variables for username and password
        input_user = req.body.username;
        input_pass = req.body.password;
        input_repass = req.body.repassword;

        console.log(input_user);
        console.log(input_pass);
        console.log(input_repass);

        if (input_pass == input_repass) {
            const hashed_pass = await bcrypt.hash(input_pass, 10);
            const hashedId = await bcrypt.hash(input_user, 10);
            addUser({
                userId: hashedId,
                username: req.body.username, 
                password: hashed_pass,
            }).catch(console.error);
            res.redirect('/login');
        }
        else{
            console.log("Passwords don't match.");                  // Change to alert the user instead
        }
    } catch (error) {
        console.log(error);
    }
});

async function addUser(newUser){
    // const uri for remote database
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await _addUser(client, newUser);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function _addUser(client, newUser){
    // Insert values to collection
    const result = await client.db("Trial").collection("check1").insertOne(newUser);
    console.log(`New user created with the following id: ${result.insertedId}`);
}

// Binds and listens for connection on specified host and port.
// Full syntax: app.listen(port, [host], [backlog], [callback]])
app.listen(process.env.port);
console.log('Server is active on port ' + process.env.port + '.');
