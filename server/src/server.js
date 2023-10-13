const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { port } = require("./shared/config");
const { errorMiddlewareFunc } = require("./shared/errors/error");
const cors = require("cors");
const db = require("./db");
const userRout = require("./router");
const getAllRooms = require("./services/getAllChatRooms");
const sendMessage = require("./services/sendMessage");
const getRoomMessages = require("./services/getRoomMessages");
const lastActivity = require("./services/lastActivity");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

app.use(userRout);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", async (socket) => {
  console.log("New client connected");

  try {
    const rooms = await getAllRooms();

    socket.emit("room:list", rooms);
  } catch (error) {
    console.error("Error sending existing rooms:", error);

    socket.emit("error", "Error fetching rooms");
  }

  socket.on("room:join", (room) => {
    socket.join(room);
    console.log(`Client joined room: ${room}`);
  });

  socket.on("room:join", async (room) => {
    try {
      const messages = await getRoomMessages({ room });

      socket.emit("message:list", messages);
    } catch (error) {
      console.error("Error sending existing messages:", error);

      socket.emit("error", "Error fetching messages");
    }
  });

  socket.on("message:new", async ({ room, message, user }) => {
    try {
      const result = await sendMessage({ room, message, user });

      lastActivity(room);

      const rooms = await getAllRooms();

      socket.emit("room:list", rooms);

      io.to(room).emit("message:new", result);
    } catch (error) {
      console.error("Error saving a new message:", error);

      socket.emit("error", "Error sending message");
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.use(errorMiddlewareFunc);

db();

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
