const express = require("express");
const router = express.Router();
const { messageController } = require("../controllers/Message.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post(
  "/chats/:chatId/messages",
  authMiddleware,
  messageController.createMessage
);

router.get(
  "/chats/:chatId/messages",
  authMiddleware,
  messageController.getMessage
);

router.delete(
  "/chats/:chatId/messages/:messageId",
  authMiddleware,
  messageController.deleteMessage
);

module.exports = router;
