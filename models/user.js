const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     USERINPUT:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *       example:
 *         name: John Doe
 *         email: john.doe@example.com
 *         password: mypassword
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     USEROUTPUT:
 *       type: object
 *       example:
 *         name: John Doe
 *         email: john.doe@example.com
 *         password: mypassword
 *         _v: 1
 */

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	dob: { type: Object },
	address: { type: Object },
});

const USER = mongoose.model("user", userSchema);

module.exports = USER;
