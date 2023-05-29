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
const uri = process.env.URI;

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
        res.data = { username: req.user.username };
    } else {
        res.data = { username: 'Guest' };
    }
    next();
}

function checkLogin (req, res, next){
    console.log("Login Checked: ")
    if (req.user) {
        console.log("User logged in!")
        res.redirect('/');
    }
    else{
        console.log("User not logged in!")
        next();
    }
}

function checkNotLogin (req, res, next){
    console.log("Login Checked: ")
    if (!req.user) {
        console.log("User not logged in!")
        res.redirect('/');
    }
    else{
        console.log("User logged in!")
        next();
    }
}

// Get request from route '/' and callback function request(req) and response(res)
// req represents the HTTP request
// res represents the HTTP response
app.get('/', fetchUser, async function(req,res)
{
    res.render('pages/home', res.data);
});

// async function getRandomRecord(collectionName, maxNum, getNumber) {
//     const newClient = new MongoClient(uri)
//     try {
//         await newClient.connect();
//         var record = await newClient.db("cmsc129_lagaw").collection(collectionName).find().limit(getNumber).skip(maxNum);
//         return record;
//     } catch (error) {
//         console.error(error)
//     } finally {
//         await newClient.close()
//     }
// }

app.get('/search', fetchUser, async function(req,res)
{
    // HTTP render response
    //res.render('pages/home');
    var query = req.query['query'];
    res.data['search'] = query;

    if(query){
        // Wait for each db call

        // foods = await getCollectionRecord('Foods', {Title: {$regex: query, $options: 'i'}});
        // accommodations = await getCollectionRecord('Accommodations', {Title: {$regex: query, $options: 'i'}});
        // places = await getCollectionRecord('Places', {Title: {$regex: query, $options: 'i'}});
        // festivals = await getCollectionRecord('Festivals', {Title: {$regex: query, $options: 'i'}});

        // Wait for each db call in parallel
        try{
            var [foods, accommodations, places, festivals] = await Promise.all([
                getCollectionRecord('Foods', {Title: {$regex: query, $options: 'i'}}),
                getCollectionRecord('Accommodations', {Title: {$regex: query, $options: 'i'}}),
                getCollectionRecord('Places', {Title: {$regex: query, $options: 'i'}}),
                getCollectionRecord('Festivals', {Title: {$regex: query, $options: 'i'}})
            ]);
        }
        catch(e){
            console.log(e);
        }

        console.log(places);
        res.data['foods'] = foods;
        res.data['accommodations'] = accommodations;
        res.data['places'] = places;
        res.data['festivals'] = festivals;
    }
    
    res.render('pages/search', res.data);
});

app.get('/accommodate-page', fetchUser, function(req,res)
{
    // HTTP render response
    //res.render('pages/home');
    res.render('pages/accommodate-page', res.data);
});

app.get('/change-pass', checkNotLogin, function(req,res)
{
    // HTTP render response
    //res.render('pages/home');
    res.render('pages/change-pass');
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

app.get('/places-and-landmarks', fetchUser, async function(req,res)
{
    // HTTP render response
    //res.render('pages/home');
    places = await getCollectionRecord('Places', {});
    res.data['places'] = places;
    res.render('pages/places-and-landmarks', res.data);
});

app.get('/festivals', fetchUser, async function(req,res)
{
    // HTTP render response
    //res.render('pages/home');
    festivals = await getCollectionRecord('Festivals', {});
    res.data['festivals'] = festivals;
    res.render('pages/festivals', res.data);
});

app.get('/food', fetchUser, async function(req,res)
{
    // HTTP render response
    //res.render('pages/home');
    foods = await getCollectionRecord("Foods", {});
    res.data['foods'] = foods;
    console.log(foods);
    res.render('pages/food', res.data);
});

app.get('/accommodation', fetchUser, async function(req,res)
{
    // HTTP render response
    //res.render('pages/home');
    accommodation = await getCollectionRecord("Accommodations", {});
    res.data['accommodations'] = accommodation;
    console.log(accommodation);
    res.render('pages/accommodation', res.data);


});

app.get('/traffic', fetchUser,function(req,res)
{
    // HTTP render response
    //res.render('pages/home');
    var coords = req.session.coordinates;
    if(!coords) {
        res.render('pages/traffic', {API_KEY: process.env.API_KEY, username: res.data.username, coords: null});
    } else {
        res.render('pages/traffic', {API_KEY: process.env.API_KEY, username: res.data.username, coords: coords});
    }
});

app.post('/find-place', function (req, res){
    const coordinates = parseCoordinates(req.body.coordinates)
    req.session.coordinates = coordinates
    res.redirect('/traffic')
    return
})

//  Scaffold: Used to check if find-place feature works as intended
/* app.get('/find-place', function (req, res){
    const coordinates = {lat: 10.688922566424075, lng: 122.51586014224357}
    req.session.coordinates = coordinates
    res.redirect('/traffic')
    return
}) */

app.get('/settings', fetchUser, function(req,res)
{
    // HTTP render response
    //res.render('pages/home');
    res.render('pages/settings', res.data);
});

app.get('/user', fetchUser, function(req,res)
{
    // HTTP render response
    // res.render('pages/home');
    res.render('pages/user', res.data);
});

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


app.post('/change-pass', async function(req, res){
    currentPass = req.body.currentPass;
    newPass = req.body.password;
    repass = req.body.repassword;

    console.log(currentPass)
    isCorrect = await bcrypt.compare(currentPass, req.user.password);

    var isvalidPassword = await validatePassword(newPass)
    if (!isvalidPassword) {
        console.log("Password does not meet criteria.")
        req.flash("error", "Password must be 8 to 100 characters long and must contain at least 1 special character.")
        res.redirect("/change-pass")
        return
    }

    if(newPass == repass){
        if(isCorrect){
            hashedPass = await bcrypt.hash(newPass, 10);
            result = await updatePassword(hashedPass, req.user.username);
            if(result){
                req.flash("error", "Password changed successfully");
                res.redirect("/change-pass");
            }
            else{
                req.flash("error", "Something went wrong.");
                res.redirect("/change-pass");
            }
        }
        else{
            req.flash("error", "Wrong password.");
            res.redirect("/change-pass");
        }
    }
    else{
        req.flash("error", "New Passwords did not match.");
        res.redirect("/change-pass");
        return
    }
});

async function updatePassword(password, username){
    // const uri for remote database
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        result = await client.db("Trial").collection("check1").updateOne({ username: username }, {$set:{password:password}});
        return result;

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

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

        //  Check if the username already exists in the database
        var isUsernameAvailable = await checkAvailableUsername(input_user)
        if (!isUsernameAvailable){
            console.log("Username is unavailable.")
            req.flash("error", "The username is unavailable.")
            res.redirect("/register")
            return
        }

        //  Check if username matches specification criteria
        var isValidUsername = await validateUsername(input_user)
        if (!isValidUsername) {
            console.log("Username is invalid.")
            req.flash("error", "The username must be 5 to 100 characters long and must not contain any special characters.")
            res.redirect("/register")
            return
        }

        //  Check if the password matches specification criteria
        var isvalidPassword = await validatePassword(input_pass)
        if (!isvalidPassword) {
            console.log("Password does not meet criteria.")
            req.flash("error", "Password must be 8 to 100 characters long and must contain at least 1 special character.")
            res.redirect("/register")
            return
        }

        //  Check if two password inputs match
        if(!(input_pass === input_repass)) {
            console.log("Passwords don't match.")
            req.flash("error", "Passwords don't match.")
            res.redirect("/register")
            return
        }
        
        //  Since all checks pass, proceed with adding user to database
        const hashed_pass = await bcrypt.hash(input_pass, 10);
        const hashedId = await bcrypt.hash(input_user, 10);
        addUser({
            userId: hashedId,
            username: req.body.username, 
            password: hashed_pass,
        }).catch(console.error);
        res.redirect('/login'); //Add msg that account is successfully created
        return

    } catch (error) {
        console.log(error)
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
async function getCollectionRecord(collectionName, projection) {
    const newClient = new MongoClient(uri)
    try {
        await newClient.connect();
        var collection = await _getCollectionRecord(newClient, collectionName, projection)
        return collection
    } catch (error) {
        console.error(error)
    } finally {
        await newClient.close()
    }
}

async function _getCollectionRecord(client, collectionName, projection) {
    try {
        const result = await client.db("cmsc129_lagaw").collection(collectionName).find(projection).toArray();
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
            console.log("Error: Unknown property on 'key'!")
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

//  Async function that validates if username is available
async function checkAvailableUsername(username) {
    const newClient = new MongoClient(uri)
    try {
        const result = await newClient.db("Trial").collection("check1").findOne({username: username});
        if (result) {
            return false
        }
        else {
            return true
        }
    } catch (error) {
        console.error(error)
    } finally {
        await newClient.close()
    }  
}

//  Async function that validates if username meets requirements specification
async function validateUsername(username) {
    //  Regex for alphanumeric characters between 5 to 100
    const usernameRegex = /^[a-zA-Z0-9]{5,100}$/
    return usernameRegex.test(username)
}

//  Async function for checking if password meets specification criteria
async function validatePassword(password) {
    // Regex for alphanumeric characters between 8 and 100 characters long with at least 1 special character
    const passwordRegex = /^(?=.*?[!@#$%^&*()\-_=+{};:,<.>§~`|\\/[\]])[a-zA-Z0-9!@#$%^&*()\-_=+{};:,<.>§~`|\\/[\]]{8,100}$/
    return passwordRegex.test(password);
}

//  Helper function for parsing a coordinate string of the format: "<latitude>, <longitude>"
function parseCoordinates(coordinateString) {
    const coordinate = coordinateString.toString.split(", ")
    if (!(coordinate.length === 2)) {
        return null
    }
    const processedCoordinates = {lat: coordinate[0], lng: coordinate[1]}
    return processedCoordinates
}

// Binds and listens for connection on specified host and port.
// Full syntax: app.listen(port, [host], [backlog], [callback]])
app.listen(process.env.port);
console.log('Server is active on port ' + process.env.port + '.');
