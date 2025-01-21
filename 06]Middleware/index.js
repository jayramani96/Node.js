const express = require("express")
const port = 3008
const path = require("path");

const app = express();

app.use("/public", express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

let people = [
    { id: 1, task: "Morning", description: "Breakfast"},
    { id: 2, task: "After", description: "Dinner"},
];

const middle = (req,res,next) => {
    console.log(req.body);
    console.log("hellow i am mioddleware"),
    next();
}

app.get("/", (req, res) => {
    res.render("index", { people });
});

app.post("/addData",middle, (req, res) => {
    req.body.id = people.length + 1;
    people.push(req.body);
    res.redirect("/");
});

app.get("/editData/:id", (req,res) => {
    let data = people.find((item) => item.id == req.params.id);
    res.render("edit", { data });
})

app.post("/updateData", (req,res) => {
    people.forEach((item) => {
        if(item.id == req.body.id){
            item.task = req.body.task
            item.description = req.body.description
        }else{
            item
        }
    })
    res.redirect("/");  
})

app.get("/deleteData", (req, res) => {
    people = people.filter((item) => item.id != req.query.id);
    res.redirect("/");
});

app.listen(port, (err) => {   
    err ? console.log(err) : console.log("server started on port " + port);
});
