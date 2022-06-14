const { response } = require("express");
const express = require("express");
const app = express();
const PORT = 8000;

app.use(express.static('public'))

app.get("/", (request, response) => {
	response.sendFile(__dirname + "/index.html");
});
app.listen(PORT, () => {
	console.log(`this server is running on ${PORT}`);
});
