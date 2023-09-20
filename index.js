require('events').EventEmitter.defaultMaxListeners = 15; 
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const socketIo = require("socket.io");
const messageRoute = require("./routes/message.route");
const chatRoute = require("./routes/chat.route");

const app = express()

app.use('/img', express.static(__dirname + '/img'));
app.use(express.json())
app.use(cors())

app.use(require('./routes/user.route'));
app.use(require('./routes/card.route'))
app.use(require("./routes/user.route"));
app.use("/api", messageRoute);
app.use("/api", chatRoute);

mongoose
  .connect(process.env.MONGO_SERVER, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const server = http.createServer(app);
    const io = socketIo(server);

    io.on("connection", (socket) => {
      console.log("User connected");

      socket.on("disconnect", () => {
        console.log("User disconnected");
      });
    });

    const PORT = process.env.PORT || 4000;
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));

