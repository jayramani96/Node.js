const ctl = require("../controller/firstCtl");
const express = require("express");
const route = express.Router();
const multer = require("multer");

const Storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,"uploads/")
    },
    filename : (req,file,cb)=>{
        cb(null, file.fieldname + "-" + Date.now());
    }
})

const upload = multer({storage : Storage}).single("image");

route.get("/", ctl.admin);
route.get("/addAdmin", ctl.addAdmin);
route.get("/viewAdmin", ctl.viewAdmin)
route.post("/addAdminData",ctl.addAdminData)

module.exports = route;