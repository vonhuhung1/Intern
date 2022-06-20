const express = require("express");
const { Server } = require("socket.io");
const app = express();
const http = require("http");
const server = http.createServer(app);
var cors = require("cors");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5501",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const port = 3000;

app.use(cors());

io.on("connection", (socket) => {
  //Record
  console.log("user connected: " + socket.id);
  let x = socket.id;
  socket.emit("Sever-send-room", x);
  socket.on("Client-send-data", (data) => {
    console.log(data);
    socket.on("Send-room", (roomID) => {
      socket.to(roomID).emit("Sever-send-data", data);
    });
  });
  //Live
  socket.on("Room-Join", (data) => {
    console.log(data);
    socket.join(data);
    socket.emit("Send-Room-Create", data);
  });
  let rooms = socket.adapter.rooms;
  console.log(rooms);
});

server.listen(port, () => {
  console.log(`Server Listening to port ${port}`);
});
