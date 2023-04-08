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