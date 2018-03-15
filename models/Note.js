const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NoteSChema = new Schema({
	title: String,
	body: String
});

export default mongoose.model("Note", NoteSchema); 