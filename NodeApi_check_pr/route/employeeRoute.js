const express = require('express');
const route = express.Router();
const controller = require('../controller/controller');
const checkAdminOrManager = require('../middleware/auth');
const authentication = require('../middleware/jwt');
const upload = require('../middleware/multer');

route.post("/register", authentication, upload, controller.employeeRegister);
route.post("/login", controller.employeeLogin);
route.get("/list", authentication, checkAdminOrManager, controller.employeeList);
route.get("/profile", authentication, controller.employeeProfile);
route.post("/changePassword", authentication, controller.employeeChangePassword);
route.post("/forgotPassword", controller.forgotPassword);
route.post("/resetPassword", controller.resetPassword);
route.delete("/delete", authentication, checkAdminOrManager, controller.deleteemployee);
route.put("/update", authentication, upload, controller.updateemployee);

module.exports = route;
