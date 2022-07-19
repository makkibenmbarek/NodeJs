const router = require("express").Router();
const { route } = require("express/lib/application");
const chatController = require("../controller/chat.room.controller");


/**
 * @Path /chatPim
 */

    router
    .post("/sendMessage", chatController.sendMessage)
    router
    .post("/getUserChat", chatController.getUserChat)
   
module.exports = router;