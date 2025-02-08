const schema = require("../model/firstSchema");
const fs = require("fs");

module.exports.firstPage = async (req,res) =>  {
    await schema.find({}).then((data) => {
        res.render("index", {data});
    })
}

module.exports.addData = async (req,res) => {
    req.body.image = req.file.path;
    await schema.create(req.body).then(()=>{
        res.redirect("/");
    })
};

module.exports.deleteData = async (req,res) => {
    let singleData = await schema.findById(req.query.id);
    fs.unlinkSync(singleData.image);
    await schema.findByIdAndDelete(req.query.id).then(()=>{
        res.redirect("/");
    });
};

module.exports.editData = async (req,res) => {
    let data = await schema.findById(req.params.id);
    res.render("edit", {data});
};

module.exports.updateData = async (req,res) => {
    let singleData = await schema.findById(req.body.id);
    let image = "";
    req.file ? image = req.file.path : image = singleData.image;
    req.file && fs.unlinkSync(singleData.image);
    req.body.image = image;
    await schema.findByIdAndUpdate(req.body.id, req.body).then(()=>{
        res.redirect("/");
    });
};
