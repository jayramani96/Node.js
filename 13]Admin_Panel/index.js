const express = require("express");
const port = 2008;
const db = require("./config/db");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded());
app.use("/uploads", express.static(path.join(__dirname,"upload")))
app.use(express.static(path.join(__dirname,"public")))

app.use("/", require("./routes/route"))

app.listen(port, (err) => {   
    err ? console.log(err) : console.log("server started on port " + port);
});





