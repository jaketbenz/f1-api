const { response } = require("express");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 9191;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (request, response) => {
	response.sendFile(__dirname + "/index.html");
});
app.listen(PORT, () => {
	console.log(`this server is running on ${PORT}`);
});
