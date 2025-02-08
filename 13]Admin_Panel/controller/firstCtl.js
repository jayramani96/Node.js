const schema = require("../model/firstSchema");
const fs = require("fs");

module.exports.admin = async (req,res) =>  {
        res.render("admin");
}

module.exports.addAdmin = async (req,res) =>  {
       res.render("addAdmin");
}
module.exports.addAdminData = async (req,res) =>  {
       await schema.create(req.body).then(()=>{
        res.redirect("addAdminData");
       })
 }

module.exports.viewAdmin = async (req,res) =>  {
        res.render("viewAdmin");
}




