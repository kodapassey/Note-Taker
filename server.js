const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path');
const allNotes = require('./db/db.json');

app.use(express.json());
app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.json(allNotes.slice(1));
});

app.post('/api/notes', (req, res) => {
    const newNote = createNote(req.body, allNotes);

    res.json(newNote);
});

app.delete('/api/notes/:id', (req, res) => {

});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

function createNote(body, notesArray) {
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

function deleteNote(id, notesArray) {
    for (let i = 0; i < notesArray.length; i++) {
        
    }
};


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});