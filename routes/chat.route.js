const express = require("express");
const router = express.Router();
const { chatController } = require("../controllers/chat.controller");

// Создание нового чата
router.post("/chats", chatController.createChat);

// Получение списка чатов
router.get("/chats", chatController.getAllChats);

// Получение информации о конкретном чате
router.get("/chats/:chatId", chatController.getChatById);

// Добавление участника в чат
router.post("/chats/:chatId/participants", chatController.addParticipant);

// Удаление участника из чата
router.delete(
  "/chats/:chatId/participants/:userId",
  chatController.removeParticipant
);

module.exports = router;
