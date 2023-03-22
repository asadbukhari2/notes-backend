const { USER } = require("../models");
const USER_JWT = require("../models/user_jwt");
const {
	hashPassword,
	comparePassword,
	generateToken,
	decryptToken,
} = require("../utils/helper");

exports.signup = async (req, res) => {
	const { email, name, password, dob, address } = req.body;

	const user = await USER.findOne({ email });

	if (user) {
		throw {
			code: 409,
			success: false,
			message: "User exists with the same Email!",
		};
	}

	const hasedPassword = hashPassword(password);

	const newUser = await USER.create({
		email,
		name,
		password: hasedPassword,
		dob,
		address,
	});

	return res
		.status(200)
		.send({ success: true, message: "User created!", user: newUser });
};

exports.login = async (req, res) => {
	const { email, password } = req.body;

	const user = await USER.findOne({ email });

	if (!user || !comparePassword(password, user?.password)) {
		throw {
			code: 404,
			success: false,
			message: "Email or password incorrect",
		};
	}

	const token = generateToken({
		id: user?._id,
		email,
	});

	if (!token) {
		throw {
			code: 500,
			success: false,
			message: "Error in generating token",
		};
	}

	const decryptedToken = decryptToken(token);
	console.log(decryptedToken);

	await USER_JWT.create({
		user_id: user._id,
		token: token,
		iat: decryptedToken.iat,
		exp: decryptedToken.exp,
	});

	return res.status(200).send({
		code: 200,
		success: true,
		message: `Welcome ${user.name}`,
		data: user,
		token,
	});
};

exports.getAllUsers = async (req, res) => {
	const items = await USER.find({});

	return res
		.status(200)
		.send({ code: 200, success: true, message: "All users!", items });
};

exports.deleteUser = async (req, res) => {
	const { id } = req.params;

	await USER.findByIdAndDelete(id);
	return res
		.status(200)
		.send({ code: 200, success: true, message: "User Deleted!" });
};
