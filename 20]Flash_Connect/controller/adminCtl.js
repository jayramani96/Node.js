const schema = require("../model/adminModel");
const fs = require("fs")


module.exports.adminLogin = (req, res) => {
    res.render("adminLogin");
}

module.exports.login = async (req, res) => {
    console.log(req.body);
    
    await schema.findOne({}).then(data => {
        if(data.email == req.body.email && data.password == req.body.password){
            req.flash("success","Login Successfully !")
            res.redirect("/dsashboard");
            res.redirect("/dashboard");
        }else{
            res.redirect("/");
        }
    })
}

module.exports.logout = (req, res) => {
    req.session.destroy()
    res.redirect("/");
}

module.exports.dashboard = (req, res) => {
    // req.cookies.adminData ? res.render("dashboard") : res.redirect("/");
    res.render("dashboard")
}

module.exports.adminForm = (req, res) => {
    res.render("adminForm");
}

module.exports.addAdmin = async (req, res) => {
    req.body.image = req.file.path;
    await schema.create(req.body).then(() => {
        res.redirect("/dashboard");
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

module.exports.profile = (req,res) => {
    res.render("profile");
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

module.exports.changePass = (req,res)=>{
    res.render("changePass")
}

module.exports.changePassword = async (req,res) =>{
    let admin = req.user;
    console.log(admin);
    console.log(req.body);
    

    if(req.body.oldPass == admin.password){
        if(req.body.newPass != req.body.oldPass){
            if(req.body.newPass == req.body.confirmPass){
                await schema.findByIdAndUpdate(admin.id,{password : req.body.newPass})
                .then(()=>{
                    res.redirect("/logout")
                })
            }else{
                res.redirect("/changePass")
            }
        }else{
            res.redirect("/changePass")
        }
    }else{
        res.redirect("/changePass")
    }
}