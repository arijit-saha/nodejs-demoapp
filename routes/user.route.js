const express = require('express');
const UserRoute = express.Router();
const UserService = require('../services/user.service');
const { Authorize } = require("../middleware/auth.middleware");


UserRoute.post("/login", UserService.login);
UserRoute.post("/register", UserService.register);
UserRoute.get("/all", Authorize, UserService.fetchAllUsers);
UserRoute.patch("/update", Authorize, UserService.updateUser);
UserRoute.delete("/delete", Authorize, UserService.deleteUser);

module.exports = { UserRoute };