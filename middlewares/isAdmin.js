const jwt = require("jsonwebtoken");
const { secret } = require("../config");
const { USER } = require("../models");
const USER_JWT = require("../models/user_jwt");

module.exports = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return res.status(400).send({
			code: 400,
			success: false,
			message: "Authorization Header missing",
		});
	}

	const token = authHeader.split(" ")[1];

	if (!token) {
		return res.status(400).send({
			code: 400,
			success: false,
			message: "Token must not be empty",
		});
	}

	jwt.verify(token, secret, async (err, decodedToken) => {
		if (err) {
			return res.status(400).send({
				code: 400,
				success: false,
				message: err.message,
			});
		}

		const user = await USER.findById(decodedToken.id);

		if (!user) {
			return res.status(400).send({
				code: 400,
				success: false,
				message: "Unauthorized!",
			});
		}

		const isTokenValid = await USER_JWT.findOne({ token });

		if (!isTokenValid) {
			return res.status(400).send({
				code: 400,
				success: false,
				message: "Session Experied Login again!",
			});
		}
		req.user = user;
		next();
	});
};
