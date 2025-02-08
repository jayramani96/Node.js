const express = require("express");
const port = 2008;
const db = require("./config/db");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded());
app.use("/uploads", express.static(path.join(__dirname,"uploads")))

app.use("/", require("./routes/route"))
app.use("/addData", require("./routes/route"));
app.use("/deleteData", require("./routes/route"));
app.use("/editData/:id", require("./routes/route"));
app.use("/updateData", require("./routes/route"));

app.listen(port, (err) => {   
    err ? console.log(err) : console.log("server started on port " + port);
});





