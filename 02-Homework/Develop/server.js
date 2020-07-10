const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var notes = [
    {
        title: "title",
        text: "text"
    }
]

app.get("/", function(req,res){
    res.sendFile(path.join(__dirname, "/index.html"));
})

app.get("/notes", function(req,res){
    res.sendFile(path.join(__dirname, "/notes.html"));
})

app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"))
});

const writeJSON = (x) =>{
    fs.appendFile("./db/db.json", x, (err)=>{
        if (err) throw err;
    })
}

app.post("/api/notes", function(req,res){
    var newNote = req.body;

    newNote.routeName = newNote.name.replace(/\s+/g, "").toLowerCase();
    console.log(newNote);
    notes.push(newNote)
    res.json(newNote);
})

app.listen(PORT, function(){
    console.log("listening on Port: " + PORT)
})