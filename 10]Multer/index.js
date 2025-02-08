const express = require("express");
const port = 2008;
const db = require("./config/db");
const schema = require("./model/firstSchema");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const Storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,"uploads/")
    },
    filename : (req,file,cb)=> {
        cb(null,file.fieldname+ "-" + Date.now())
    }
})

const upload = multer({storage:Storage}).single("image")

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded());
app.use("/uploads", express.static(path.join(__dirname,"uploads")))
app.use("/", require("./routes/route"))

app.get("/", async(req, res) => {
  await schema.find({})
  .then((data)=>{
    res.render("index", {data});
  })
});

app.post("/addData",upload, async(req, res) => {
    req.body.image = req.file.path;
    await schema.create(req.body).then(()=>{
        res.redirect("/");
    })
});

app.get("/deleteData", async (req,res) => {
    let singleData = await schema.findById(req.query.id);
    fs.unlinkSync(singleData.image);
    await schema.findByIdAndDelete(req.query.id).then(()=>{
        res.redirect("/");
    })
})

app.get("/editData/:id", async (req,res) => {
    let data = await schema.findById(req.params.id);
    res.render("edit", {data});
});

app.post("/updateData", upload, async(req,res) => {
    let singleData = await schema.findById(req.body.id);
    let image = "";
    req.file ? image = req.file.path : image = singleData.image;
    req.file && fs.unlinkSync(singleData.image);
    req.body.image = image;
    await schema.findByIdAndUpdate(req.body.id, req.body).then(()=>{
        res.redirect("/");
    });
})

app.listen(port, (err) => {   
    err ? console.log(err) : console.log("server started on port " + port);
});





