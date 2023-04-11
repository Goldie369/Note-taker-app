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
app.get("/", (_req, res) => {
    //-- Adding a index.html file to the client as a response to a GET request to the root path of the server ("/")--//
      //-- The res.sendFile() method is an Express.js method that sends a file as the response to a client's request--//
      //--The argument passed to sendFile() is the file path of the file to be sent--//
      res.sendFile(__dirname + "/public/index.html");
    });

    //-- GET route for the /notes path of the server--//
app.get('/notes', (_req, res) => {
    //-- The res.sendFile() method is an Express.js method that sends a file as the response to a client's request--//
    //-- The argument passed to sendFile() is the file path of the file to be sent--//
    //-- __dirname is a global variable that refers to the directory where the current script file is located. '/public/notes.html'--//
    res.sendFile(__dirname + '/public/notes.html');
  });
  //--Adding a function reads the content of a JSON file named db.json in the db--//
  function getDBContent() {
    const dbStr = fs.readFileSync('./db/db.json', 'utf8');
    return JSON.parse(dbStr);
  }

  //-- Adding a  GET route for the /api/notes path of the server--//
//-- Adding a getDBContent() function that is called to read the contents of the db.json file--//
//-- res.json() method is then used to send the notes object as a JSON response to the user--//
app.get('/api/notes', (_req, res) => {
    const notes = getDBContent();
    res.json(notes);
});

//-- Adding s POST route for the /api/notes path of the server--//
//-- "notes" is an array written back to the db.json file using the fs.writeFile() method--//
app.post('/api/notes', (req, res) => {
    console.log(req.body);
    let notes = getDBContent() 
      notes.push({
        title: req.body.title,
        text: req.body.text,
        id: uuid(),
      });
      fs.writeFile('db/db.json', JSON.stringify(notes, null, 4), (err) => {
        if (err) throw err;
        res.json(notes);
      })
  });

  //-- Adding a DELETE route for the /api/notes/:id path of the server--//
//--When a user sends a DELETE request to this path with a specific note ID as a parameter the function will be executed--//
//-- The notes array is then read from the db.json file using the getDBContent() function--//
app.delete('/api/notes/:id', (req, res) => {
    const noteID = req.params.id;
  
     let notes = getDBContent()
     
      notes = notes.filter((note) => note.id !== noteID);
  
      fs.writeFile('db/db.json', JSON.stringify(notes), (err) => {
        if (err) throw err;
        res.json(notes);
      })
  });
  
  //-- This code starts the server--//
//--If the environment variable PORT is set, the server will listen on that port number--//
app.listen(port, () => console.log(`Server started at port ${port}`));