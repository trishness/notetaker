const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 8080;
// const util = require("util");
// const fs = require("fs");
const DB = require("./DB");
// const uuidv1 = require("uuid/v1");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", async (req, res) => {
    res.json(await DB.readNotes())
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.post("/api/notes", async function (req, res) {
    const newNote = req.body
    const currentNotes = await DB.readNotes();
    await DB.writeNotes(newNote, currentNotes)
    return res.json("This worked!");
});

app.delete('api/notes/:id', async (req,res) => {
    const requestedID = req.params.id;
    const currentNotes = await DB.readNotes();
    await DB.deleteJSON(currentNotes, requestedID)
    res.json("This worked!");
})

app.listen(PORT, function () {
    console.log("listening on Port: " + PORT)
})

// module.exports = new server();