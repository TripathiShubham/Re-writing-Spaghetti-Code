var express = require("express");

var app = express();

app.use("/js", express.static(__dirname + "/js"));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(3100, () => {
    console.log("server started");
});