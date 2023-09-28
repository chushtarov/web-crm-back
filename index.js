require("events").EventEmitter.defaultMaxListeners = 15;

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const socketIo = require("socket.io");
const messageRoute = require("./routes/message.route");
const chatRoute = require("./routes/chat.route");
const Chat = require("./models/Chat.model");
const moment = require('moment'); 

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173", // Замените на адрес вашего клиента
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use("/img", express.static(__dirname + "/img"));
app.use(express.json());
app.use(cors());

app.use(require("./routes/user.route"));
app.use(require("./routes/card.route"));
app.use("/api", messageRoute);
app.use("/api", chatRoute);

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("newMessage", (message) => {
    console.log("Received new message:", message);
    message.timestamp = moment().format("HH:mm");

    const today = moment().format("YYYY-MM-DD");
    const messageDate = moment(message.timestamp, "HH:mm").format("YYYY-MM-DD");
    if (messageDate === today) {
      message.day = "сегодня";
    } else {
      // Проверяем, было ли сообщение отправлено вчера
      const yesterday = moment().subtract(1, "day").format("YYYY-MM-DD");
      if (messageDate === yesterday) {
        message.day = "вчера";
      } else {
        // Если не сегодня и не вчера, отображаем полную дату
        message.day = moment(messageDate).format("DD.MM.YYYY");
      }}

    io.emit("chatMessage", message);
  });

  socket.on("deleteMessage", async (data) => {
    const { chatId, messageId } = data;

    try {
      const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        { $pull: { messages: messageId } },
        { new: true }
      );

      if (!updatedChat) {
        socket.emit("messageDeletionError", "Chat not found");
      } else {
        io.emit("messageDeleted", { chatId, messageId });
      }
    } catch (error) {
      console.error(error);
      socket.emit("messageDeletionError", "Failed to delete message");
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

mongoose
  .connect(process.env.MONGO_SERVER, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
