const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, max: 150 },
	content: { type: String, required: true },
	owner: { type: mongoose?.Schema?.Types?.ObjectId, ref: "user" },
	shared_with: [{ type: mongoose?.Schema?.Types?.ObjectId, ref: "user" }],
});

const NOTE = mongoose.model("note", noteSchema);

module.exports = NOTE;
