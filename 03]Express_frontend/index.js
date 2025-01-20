const express = require("express")
const port = 1008;

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded());

let student = [ 
    {id: 1, name: "a", city: "Rajkot"},
    {id: 2, name: "b", city: "Surat"},
    {id: 3, name: "c", city: "Goa"},
];

app.get("/",(req,res) => {
    res.render("index",{student});
})

app.post("/addData", (req,res) => {
    req.body.id =student.length + 1;
    student.push(req.body);    
    res.redirect("/")
})



app.listen(port,(err)=>{
    err ? console.log(err) : console.log("server started on port" +1);
})