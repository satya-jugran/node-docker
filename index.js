const express = require("express");
const mongoose = require('mongoose');
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require("./config/config");

const app = express();

const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = (n) => {
	mongoose
	.connect(mongoUrl, {
		useUnifiedTopology: true
	})
	.then(() => console.log("Connected to DB!"))
	.catch((err) => {
		console.log(err);
		if(n > 0)
			setTimeout(connectWithRetry, 5000, n - 1);
	});
}

connectWithRetry(5);


app.get("/", (req, res) => {
	res.send("Hello World!!!");
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));