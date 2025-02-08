const express = require("express")
const route = express.Router();
const ctl = require("../controller/firstCtl");

route.get("/", ctl.firstPage);

module.exports = route;