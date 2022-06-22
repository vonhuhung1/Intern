const express = require("express");
const { Server } = require("socket.io");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const { getEnvironmentData } = require("worker_threads");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5501",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const port = 3000;

app.use(cors());

//Event connect
io.on("connection", (socket) => {
  console.log("user connected: " + socket.id);
  let x = socket.id;
  socket.emit("Sever-send-room", x);
  function getData(room){
    return room;
  }
  socket.on("Room-Join", (data) => {
    if(rooms.has(data))
      {
        socket.emit("Status",true)
        socket.emit("Send-Room-Create", data);
        getData(data);
      } else {
        socket.emit("Status",false);
    }
  });
  socket.join(getData());
  //Check room
  let rooms = socket.adapter.rooms;
  socket.emit("send-rooms",rooms);
  console.log(rooms);
  //Event disconnect
  socket.on("disconnect", () => {
    console.log("user disconnected: " + socket.id);
  });
});



server.listen(port, () => {
  console.log(`Server Listening to port ${port}`);
});
