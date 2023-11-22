const express = require('express'); 
const fs = require('fs');
const db = require('./db/db.json');
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express(); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); 

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            res.json(err)
        }
        else {
            data = JSON.parse(data);
            res.json(data);
        }
    })
});

app.post('/api/notes', (req, res) => {
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        //adding unique id for new notes
        id: Math.round(Math.random() * 10000),
      };
      //pushing array to db.json
      db.push(newNote);
      //Saving to db.json of the writing to be permanent.
      fs.writeFile("./db/db.json", db, (err, data) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          //Route Status 200, good! And parse the data in JSON format.
          res.status(200).json(data);
        }
      });
});


app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);