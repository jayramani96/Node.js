const express = require("express");
const port = 2008;

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

let student = [
    { id: 1, name: "a", city: "Rajkot" },
    { id: 2, name: "b", city: "Surat" },
    { id: 3, name: "c", city: "Goa" },
];

app.get("/", (req, res) => {
    res.render("index", { student });
});

app.post("/addData", (req, res) => {
    req.body.id = student.length + 1;
    student.push(req.body);
    res.redirect("/");
});

app.get("/editData/:id", (req,res) => {
    let data = student.find((item) => item.id == req.params.id);
    res.render("edit", { data });
})

app.post("/updateData", (req,res) => {
    student.forEach((item) => {
        if(item.id == req.body.id){
            item.name = req.body.name
            item,city = req.body.city
        }else{
            item
        }
    })
    res.redirect("/");  
})

app.get("/deleteData", (req, res) => {
    student = student.filter((item) => item.id != req.query.id);
    res.redirect("/");
});

app.listen(port, (err) => {   
    err ? console.log(err) : console.log("server started on port " + port);
});
