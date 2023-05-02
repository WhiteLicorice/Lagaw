/*
    This is a web application developed by Rene Andre Jocsing, Ron Gerlan Naragdao, Laviele Trias, and Chancy Ponce de Leon in partial fulfillment of the requirements of the course Software Engineering II A.y. 2022 – 2023.
    Date Created: February 25, 2023
*/

/* Environment Variables */
    //  Abstracted away in .env -> install via "npm install dotenv" then create a ".env" file in your root directory -> add port,  API_KEY, and secret variables 
require('dotenv').config();
// Port value

/* Main Code */

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://cmsc129:pftEY4nXAQ6ejDN7@cluster0.a2oufuf.mongodb.net/?retryWrites=true&w=majority";

const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const express = require('express');
const session = require('express-session');

var session_user;

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

function fetchUser (req, res, next) {
    if (req.user){
        res.name = { username: req.user.username };
    } else {
        res.name = { username: 'Guest' };
    }
    next();
}

function checkLogin (req, res, next){
    console.log("Login Checked")
    if (req.user) {
        res.redirect('/');
    }
    else{
        next();
    }
}

// Get request from route '/' and callback function request(req) and response(res)
// req represents the HTTP request
// res represents the HTTP response
app.get('/', fetchUser ,function(req,res)
{
    // HTTP render response
    //res.render('pages/home');
    res.render('pages/home', res.name);
});

app.get('/login', checkLogin, function(req,res)
{
    // HTTP render response
    //res.render('pages/home');
    res.render('pages/login');
});

app.get('/register', checkLogin, function(req,res)
{
    // HTTP render response
    //res.render('pages/home');
    res.render('pages/register');
});

app.get('/places-and-landmarks', fetchUser, function(req,res)
{
    // HTTP render response
    //res.render('pages/home');
    res.render('pages/places-and-landmarks', res.name);
});

app.get('/culture-and-festivals', fetchUser, function(req,res)
{
    // HTTP render response
    //res.render('pages/home');
    res.render('pages/culture-and-festivals', res.name);
});

app.get('/food', fetchUser, function(req,res)
{
    // HTTP render response
    //res.render('pages/home');
    res.render('pages/food', res.name);
});

app.get('/accommodation', fetchUser, function(req,res)
{
    // HTTP render response
    //res.render('pages/home');
    res.render('pages/accommodation', res.name);


});

app.get('/traffic', fetchUser,function(req,res)
{
    // HTTP render response
    //res.render('pages/home');
    res.render('pages/traffic', {API_KEY: process.env.API_KEY, username: res.name.username, coords: null});
    //  TODO: Implement POST route that grabs initial coordinates from an accommodation page then passes coords to /traffic GET route
});

app.get('/settings', fetchUser, function(req,res)
{
    // HTTP render response
    //res.render('pages/home');
    res.render('pages/settings', res.name);
});

app.get('/user', fetchUser, function(req,res)
{
    // HTTP render response
    // res.render('pages/home');
    res.render('pages/user', res.name);
});

// TODO: Add logout button in the frontend that calls '/logout'
app.get('/logout', function (req, res)
{
    req.session.destroy();
    console.log("Logout.");
    res.redirect('/');
})

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

//  TODO: Add error-handling for usernames that already exist in the database.
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
            //  TODO: Pass EJS error template to frontend.
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

//  STUB: Generic method for grabbing accomodations, foods, etc -> use string parameter collectionName as key
async function getCollection(collectionName) {
    const newClient = new MongoClient(uri)
    try {
        await newClient.connect();
        var collection = await _getCollection(collectionName)
        return collection
    } catch (error) {
        console.error(error)
    } finally {
        await client.close()
    }
}

async function _getCollection(collectionName) {
    const newClient = new MongoClient(uri)
    try {
        const result = await newClient.db("Trial").collection(collectionName).find().toArray();
        if (!result) {
            console.log("No such collection exists!")
            return null
        }
        else {
            console.log("Collection retrieved!")
            return result
        }
    } catch (error) {
        console.error(error)
    } finally {
        await newClient.close()
    }  
}

//  Exposed sorting method for sorting a collection of objects based on a given key (property)
async function sortCollection(collection, key) {
    if(collection) {
        if (typeof collection[0].key === "number") {
            var sortedCollection = await _sortCollectionNum(collection, key)
            return sortedCollection
        } else if (typeof collection[0].key === "string") {
            var sortedCollection = await _sortCollectionString(collection, key)
            return sortedCollection
        } else {
            console.log("Unknown property!")
            return null
        }
    } else {
        return null
    }
}

//  Abstracted sorting method used for sorting on a String type key
async function _sortCollectionString(collection, key, order) {
    if (order.toLowerCase === "ascending") {
        await collection.sort((a,b) => (a.key > b.key) ? 1 : ((b.key > a.key) ? -1 : 0))
        return collection
    }
    else if (order.toLowerCase === "descending") {
        await collection.sort((a,b) => (a.key < b.key) ? 1 : ((b.key < a.key) ? -1 : 0))
        return collection
    }
    else {
        console.log("Error: undefined 'order' parameter!")
        return null
    }
}

//  Abstracted sorting method used for sorting on a Numerical type key
async function _sortCollectionNum(collection, key, order) {
    if (order.toLowerCase() === "ascending") {
        await collection.sort((a,b) => a.key - b.key);
        return collection;
    } else if (order.toLowerCase() === "descending") {
        await collection.sort((a,b) => b.key - a.key);
        return collection;
    } else {
        console.log("Error: undefined 'order' parameter!");
        return null;
    }
}

// Binds and listens for connection on specified host and port.
// Full syntax: app.listen(port, [host], [backlog], [callback]])
app.listen(process.env.port);
console.log('Server is active on port ' + process.env.port + '.');
