const express = require("express")
const port = 4008
const path = require("path")

const app = express();
app.set("view engine", "ejs");
app.use("/public", express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({extended : true}))


app.get("/", (req,res) => {
    res.render("index");
})

app.listen(port,(err)=> {
    err ? console.log(err) : console.log("server started on port :" + port);
})