const express = require("express");
const path = require("path");
const port = 2008;
const cookie = require("cookie-parser");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded());
app.use(cookie());

const db = require("./config/db");
app.use("/",express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/", require("./router/route"));

app.listen(port, (err) => {
    err ? console.log("Error : ", err) : console.log("Server is running on port : ", port);
})