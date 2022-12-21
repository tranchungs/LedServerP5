const express = require("express");
const Router = express();
const LEDController = require('./Controller')
Router.get("/info/:id",LEDController.getData);
Router.get("/ping/:id",LEDController.ping);
Router.get("/all",LEDController.getDataAll);
Router.post("/add",LEDController.addLed);
Router.post("/",LEDController.updateData);
module.exports = Router;