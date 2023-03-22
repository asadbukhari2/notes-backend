const { NOTE, USER } = require("../models");

exports.create = async (req, res) => {
	const payload = req.body;
	const description = payload.content.slice(0, 140);
	const newNote = await NOTE.create({
		...payload,
		description,
	});

	return res
		.status(200)
		.send({ success: true, message: "Note created!", note: newNote });
};

exports.shareNote = async (req, res) => {
	const { id } = req.params;
	const { user } = req.body;

	if (!user) {
		throw {
			code: 404,
			success: false,
			message: "Invalid Data!",
		};
	}

	const userExists = await USER.findOne({ email: user });

	if (!userExists) {
		throw {
			code: 404,
			success: false,
			message: "User Not found",
		};
	}

	if (id === user) {
		throw {
			code: 400,
			success: false,
			message: "You can't share with yourself",
		};
	}

	await NOTE.findByIdAndUpdate(id, {
		$push: { shared_with: userExists?._id },
	});

	return res.status(200).send({ success: true, message: "Shared!" });
};

exports.deleteNote = async (req, res) => {
	const { id } = req.body;

	const note = await NOTE.findById(id);

	if (!note) {
		throw {
			code: 404,
			success: false,
			message: "Note not found!",
		};
	}

	await NOTE.findByIdAndDelete(id);

	return res.status(200).send({
		code: 200,
		success: false,
		message: "Note Deleted!",
	});
};
