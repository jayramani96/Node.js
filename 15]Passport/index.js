const express = require("express");
const path = require("path");
const port = 2008;
const db = require("./config/db");
const cookie = require("cookie-parser");
const passport = require("passport"); 
const session = require("express-session");

const app = express();

app.set("view engine", "ejs");

app.use(
    session({
        name: "local",
        secret: "rnw",
        resave: true,
        saveUninitialized: false,
        cookie: { maxAge: 10000 },
    })
);

app.use(passport.initialize());
app.use(passport.session())


app.use(cookie());
app.use(express.urlencoded());


app.use("/",express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/", require("./router/route"));

app.listen(port, (err) => {
    err ? console.log("Error : ", err) : console.log("Server is running on port : ", port);
})