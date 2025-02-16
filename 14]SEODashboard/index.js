const express = require("express");
const path = require("path");
const port = 2007;
const cookie = require("cookie-parser");

const app = express();
const db = require("./config/db");

app.set("view engine", "ejs");
app.use(express.urlencoded());
app.use(cookie());
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/", require("./routes/route"));
app.listen(port, err => {
    err ? console.log("Error : ", err) : console.log("Server started on port : ", port)
})