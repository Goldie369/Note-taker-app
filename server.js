const express = require('express');
const app = express();
const fs = require('fs');
const uuid = require('./helper/uuid');

//-- Process.env.PORT is a variable that represents the port number that will be deployed to Heroku--//
const port = process.env.PORT || 3001;

//-- express.json() is middleware that parses incoming JSON data in the request body and makes it available as req.body on the server--//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//-- GET route for the root path of the server--//
//-- Adding a  two functions (req and res), which represent the incoming request--//
//--Inside the callback function, the res.sendFile() method is used to send the index.html file to the client--//
app.get("/", (req, res) => {
    //-- Adding a index.html file to the client as a response to a GET request to the root path of the server ("/")--//
      //-- The res.sendFile() method is an Express.js method that sends a file as the response to a client's request--//
      //--The argument passed to sendFile() is the file path of the file to be sent--//
      res.sendFile(__dirname + "/public/index.html");
    });