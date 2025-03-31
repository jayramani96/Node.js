const express = require("express");
const route = express.Router();
const indexctl = require("../controller/indexCtl");

route.get("/", indexctl.Register);
route.post("/sendData", indexctl.SignUpData);
route.get("/login", indexctl.Login);
route.post("/loginData", indexctl.LoginData);
route.get("/logout", indexctl.Logout);
route.get("/navbar",indexctl.Navbar);
route.get("/taskform",  indexctl.taskform);
route.get("/tasklist",  indexctl.tasklist);
route.post("/insert",  indexctl.addData);
route.get("/delete",  indexctl.deleteData);
route.get("/edit",  indexctl.EditData);
route.post("/update",  indexctl.UpdateData);

module.exports = route;
