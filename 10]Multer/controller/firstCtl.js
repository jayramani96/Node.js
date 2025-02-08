const schema = require("../model/firstSchema");

module.exports.firstPage = async (req,res) =>  {
    await schema.find({}).then((data) => {
        res.render("index", {data});
    })
}

module.exports.add = async (req,res) => {
    req.body.image = req.file.path;
    await schema.create(req.body).then(()=>{
        res.redirect("/");
    })
};

module.exports.delete = async (req,res) => {
    let singleData = await schema.findById(req.query.id);
    fs.unlinkSync(singleData.image);
    await schema.findByIdAndDelete(req.query.id).then(()=>{
        res.redirect("/");
    });
};

module.exports.edit = async (req,res) => {
    let data = await schema.findById(req.params.id);
    res.render("edit", {data});
};

module.exports.update = async (req,res) => {
    let singleData = await schema.findById(req.body.id);
    let image = "";
    req.file ? image = req.file.path : image = singleData.image;
    req.file && fs.unlinkSync(singleData.image);
    req.body.image = image;
    await schema.findByIdAndUpdate(req.body.id, req.body).then(()=>{
        res.redirect("/");
    });
};
// app.post("/addData",upload, async(req, res) => {
//     req.body.image = req.file.path;
//     await schema.create(req.body).then(()=>{
//         res.redirect("/");
//     })
// });

// app.get("/deleteData", async (req,res) => {
//     let singleData = await schema.findById(req.query.id);
//     fs.unlinkSync(singleData.image);
//     await schema.findByIdAndDelete(req.query.id).then(()=>{
//         res.redirect("/");
//     })
// })

// app.get("/editData/:id", async (req,res) => {
//     let data = await schema.findById(req.params.id);
//     res.render("edit", {data});
// });

// app.post("/updateData", upload, async(req,res) => {
//     let singleData = await schema.findById(req.body.id);
//     let image = "";
//     req.file ? image = req.file.path : image = singleData.image;
//     req.file && fs.unlinkSync(singleData.image);
//     req.body.image = image;
//     await schema.findByIdAndUpdate(req.body.id, req.body).then(()=>{
//         res.redirect("/");
//     });
// })
