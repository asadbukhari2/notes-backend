const jwt = require("jsonwebtoken");
const { secret } = require("../config");
const { USER } = require("../models");
const USER_JWT = require("../models/user_jwt");

module.exports = (req, res, next) => {
	// const authHeader = req.headers.authorization;
	const authHeader = req.headers["x-api-key"];

	if (!authHeader) {
		return res.status(400).send({
			code: 400,
			success: false,
			message: "x-api-key Header Missing!",
		});
	}

	if (authHeader && authHeader === "thisisfuckingkey") {
		next();
	} else if (authHeader !== "thisisfuckingkey") {
		return res.status(401).json({
			code: 401,
			success: false,
			message: "Please provide correct API key or generate a new one",
		});
	} else {
		return res.status(401).json({
			code: 401,
			success: false,
			message: "API KEY Required",
		});
	}
};
