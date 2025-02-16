const schema = require("../model/adminModel");
const fs = require("fs")

module.exports.dashboard = (req, res) => {
    res.render("dashboard");
}

module.exports.adminForm = (req, res) => {
    res.render("adminForm");
}

module.exports.addAdmin = async (req, res) => {
    req.body.image = req.file.path;
    await schema.create(req.body).then(() => {
        res.redirect("/");
    })
}

module.exports.adminTable = async (req, res) =>{
    await schema.find({}).then(admins => {
        res.render("adminTable", {admins});
    })
}

module.exports.adminDelete = async(req, res) => {
    const admin = await schema.findById(req.params.id);
    fs.unlinkSync(admin.image);
    await schema.findByIdAndDelete(req.params.id).then(() => {
        res.redirect("/adminTable");
    })
}

module.exports.adminEdit = async(req, res) => {
    await schema.findById(req.params.id).then(admin => {
        res.render("adminEdit", {admin});
    })
}

module.exports.adminUpdate = async (req, res) => {    
    const admin = await schema.findById(req.body.id);
    let img;

    req.file ? img = req.file.path : req.body.image;
    req.file && fs.unlinkSync(admin.image);
    req.body.image = img;

    await schema.findByIdAndUpdate(req.body.id, req.body).then(() => {
        res.redirect("/adminTable");
    });
}