// require for express
const express = require('express');
const fs = require('fs');
// declaring app variable as express
const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path');
const allNotes = require('./db/db.json');

app.use(express.json());
// renders public folder with html, css, and js
app.use(express.static('public'));

// get request for /notes that renders notes.html page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.json(allNotes.slice(1));
});

// post route for notes that creates notes
app.post('/api/notes', (req, res) => {
    const newNote = createNote(req.body, allNotes);

    res.json(newNote);
});

// delete route
app.delete('/api/notes/:id', (req, res) => {
    deleteNote(req.params.id, allNotes);
    res.json(true);
});

// catch all route for any unknown route that renders home page
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

// function to create a new note
function createNote(body, notesArray) {
    // sets newNote variable to body of post request
    const newNote = body;
    if (!Array.isArray(notesArray))
        notesArray = [];

    if (notesArray.length === 0)
        notesArray.push(0);

    body.id = notesArray[0];
    notesArray[0]++;
    body.id++;

    notesArray.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
    return newNote;
};

// function to delete a note
function deleteNote(id, notesArray) {
    // for loop that loops through each item of notesArray
    for (let i = 0; i < notesArray.length; i++) {
        let note = notesArray[i];

        if (note.id == id) {
            notesArray.splice(i, 1);
            fs.writeFileSync(
                path.join(__dirname, './db/db.json'),
                JSON.stringify(notesArray, null, 2)
            );
        }
    }
};

// app.listen with console.log of what port it is on
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});