
const express = require("express");

const router = express.Router();

const addMessageController = require("../controllers/MessageController");


// Send message
router.post(
    "/addMessage",
    addMessageController.addMessages
);


// Get conversation between two users
router.get(
    "/GetMessages/:senderId/:receiverId",
    addMessageController.showMessage
);


module.exports = router;