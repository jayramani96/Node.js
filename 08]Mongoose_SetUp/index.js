const express = require("express");
const port = 2008;
const db = require("./config/db");
const schema = require("./model/firstSchema");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded());

app.get("/", async(req, res) => {
  await schema.find({})
  .then((data)=>{
    res.render("index", {data});
  })
});

app.post("/addData", async(req, res) => {
    await schema.create(req.body).then(()=>{
        res.redirect("/");
    })
});

app.get("/deleteData", async(req,res) => {
    await schema.findByIdAndDelete(req.query.id).then(()=>{
        res.redirect("/");
    })
})
app.get("/editData/:id", async(req,res) => {
    let data = await schema.findById(req.params.id);
    res.render("edit", { data });
})

app.post("/updateData", async (req,res) => {
    await schema.findByIdAndUpdate(req.body.id, req.body).then(()=>{
        res.redirect("/");
    }) 
})

app.listen(port, (err) => {   
    err ? console.log(err) : console.log("server started on port " + port);
});
