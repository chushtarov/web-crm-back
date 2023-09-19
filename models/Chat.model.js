const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Ссылка на модель пользователя
    },
  ],
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat