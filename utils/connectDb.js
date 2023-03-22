const mongoose = require("mongoose");

const createConnection = url => {
	mongoose.Promise = global.Promise;
	mongoose
		.connect(url)
		.then(() => console.log("MongoDB connected"))
		.catch(err => console.log(err));
};

module.exports = createConnection;
