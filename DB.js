const fs = require("fs");
const util = require ("util");
const notes = "./db/db.json";
const uuidv1 = require("uuidv1");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile)
class DB {
    async readNotes() {
        try {
            const rawNotes = await readFileAsync(notes, "utf8")
            return rawNotes ? JSON.parse(rawNotes) : [];
        }
        catch (err) {
            console.log("error", err);
        }
    }

    async writeNotes(notesArr, existingNotes) {
        try {
            const { title, text } = notesArr;
            const newNote = { title, text, id: uuidv1() }
            const combineNotes = [newNote, ...existingNotes]
            await writeFileAsync(notes, JSON.stringify(combineNotes))
        }
        catch (err) {
            console.log("error", err);
        }
    }

    async deleteJSON(currentNotes, requestedID) {
        try {
            const filteredNotes = currentNotes.filter(function (note) {
                if (note.id !== requestedID) {
                    return true;
                }
            })
            await writeFileAsync (notes, JSON.stringify(filteredNotes))
            
        } catch (err) {
            throw err
        }
    }
}

module.exports = new DB ();