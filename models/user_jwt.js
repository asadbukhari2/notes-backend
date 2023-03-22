const mongoose = require("mongoose");

const userJWT = new mongoose.Schema({
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
		required: true,
	},
	token: { type: String },
	iat: { type: Date },
	exp: { type: Date },
});

const USER_JWT = mongoose.model("user_jwt", userJWT);

module.exports = USER_JWT;
