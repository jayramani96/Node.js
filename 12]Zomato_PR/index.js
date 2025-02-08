const express = require("express");
const db = require("./config/db");
const path = require("path");
const port = 2008;

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded());


app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/route"));

app.listen(port, (err) => {
    err ? console.log("Error : ", err) : console.log("Server is started on port : ", port);
});

