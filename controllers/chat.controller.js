const Chat = require("../models/Chat.model");
const User = require("../models/User.model");

module.exports.chatController = {
  createChat: async (req, res) => {
    try {
      const { name, participants } = req.body;
      const chat = await Chat.create({ name, participants });
      res.status(201).json(chat);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Unable to create chat" });
    }
  },

  getAllChats: async (req, res) => {
    try {
      const chats = await Chat.find();
      res.json(chats);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Unable to fetch chats" });
    }
  },

  getChatById: async (req, res) => {
    try {
      const { chatId } = req.params;
      const chat = await Chat.findById(chatId);
      if (!chat) {
        return res.status(404).json({ error: "Chat not found" });
      }
      res.json(chat);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Unable to fetch chat" });
    }
  },

  addParticipant: async (req, res) => {
    try {
      const { chatId } = req.params;
      const { userId } = req.body;

      const chat = await Chat.findById(chatId);
      if (!chat) {
        return res.status(404).json({ error: "Chat not found" });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      chat.participants.push(user);
      await chat.save();
      res.status(200).json(chat);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Unable to add participant" });
    }
  },

  removeParticipant: async (req, res) => {
    try {
      const { chatId, userId } = req.params;

      const chat = await Chat.findById(chatId);
      if (!chat) {
        return res.status(404).json({ error: "Chat not found" });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      chat.participants.pull(userId);

      await chat.save();
      res.status(200).json(chat);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Unable to remove participant" });
    }
  },
};
