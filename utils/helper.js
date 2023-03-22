const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { secret } = require("../config");

module.exports = {
	hashPassword: string => {
		const salt = bcryptjs.genSaltSync(10);
		const hashed = bcryptjs.hashSync(string, salt);
		return hashed;
	},
	comparePassword: (password, hashedPassword) => {
		return bcryptjs.compareSync(password, hashedPassword);
	},
	generateToken: payload => {
		return jwt.sign(payload, secret, {
			expiresIn: "1 day",
			algorithm: "HS256",
		});
	},
	decryptToken: token => {
		const decrypted = jwt.decode(token);
		return {
			iat: decrypted.iat * 60,
			exp: decrypted.exp * 60,
		};
	},
};
