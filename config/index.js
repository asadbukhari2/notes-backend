const dotenv = require("dotenv");
dotenv.config();

module.exports = {
	live: process.env.LIVE,
	window: process.env.WINDOW,
	max_limit: process.env.MAX_LIMIT,
	port: process.env.PORT,
	secret: process.env.SECRET,
	mongo_string: process.env.MONGO_STRING,
	mail_host: process.env.MAIL_HOST,
	mail_port: process.env.MAIL_PORT,
	mail_username: process.env.MAIL_USERNAME,
	mail_password: process.env.MAIL_PASSWORD,
	mail_from_address: process.env.MAIL_FROM_ADDRESS,
	mail_from_name: process.env.MAIL_FROM_NAME,
	otp_secret_key: process.env.OPT_SECRET_KEY,
	plastk_mongo_string: process.env.PLASTK_MONGO_STRING,
	manager_default_passcode: process.env.MANAGER_DEFAULT_PASSCODE,
};
