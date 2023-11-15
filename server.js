const express = require('express'); //importing express as a variable. 
const fs = require('fs');
const db = require('./db/db.json');

const PORT = process.env.PORT || 3001;

const app = express(); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); 


app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);