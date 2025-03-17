const express = require("express");
const route = express.Router();
const ctl = require("../controller/extraCategoryCtl")
const passport = require("../middleware/passport")

route.get("/addExtCategory",passport.checkAuth,ctl.addExtCategory)
route.post("/addExtCategory",passport.checkAuth,ctl.addExtCategoryData)
route.get("/viewExtCategory",passport.checkAuth,ctl.viewExtCategory)

module.exports= route;