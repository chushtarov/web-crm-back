require("events").EventEmitter.defaultMaxListeners = 15;

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const socketIo = require("socket.io");
const messageRoute = require("./routes/message.route");
const chatRoute = require("./routes/chat.route");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173", // Замените на адрес вашего клиента
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(express.json());
app.use(cors());

app.use(require("./routes/user.route"));
app.use("/api", messageRoute);
app.use("/api", chatRoute);

io.on("connection", (socket) => {
  console.log("User connected");

  // Обработчик события "newMessage"
  socket.on("newMessage", (message) => {
    // Отправить сообщение всем подключенным клиентам, включая отправителя
    io.emit("chatMessage", message);
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
