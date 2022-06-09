const express = require('express');
const { Server } = require("socket.io");
const app = express();
const http = require('http');
const server = http.createServer(app);
var cors = require('cors');

const io = new Server(server,{
  cors: {
    origin: "http://localhost:5501",
    methods: ["GET", "POST"],
    credentials:true,
  },
});

const port = 3000;

app.use(cors());

io.on('connection', socket => {
  console.log("user connected: " + socket.id)
  let x = socket.id;
  socket.emit("Sever-send-room",x);
  socket.on("Client-send-data",(data) => {
    socket.on("Send-room", (roomID) => {
      socket.to(roomID).emit('Sever-send-data', data);
    })
  })
  socket.emit("Sever-send-roomLive",x);
  socket.on("Send-Data-Live",(dataLive) => {
    console.log(dataLive);
    socket.on("Send-room-Live", (roomIDLive) => {
      socket.to(roomIDLive).emit('Sever-send-dataLiveStart', dataLive);
    })
  })
  // socket.on("StopShare-Data",(dataLiveStop) => {
  //   socket.to(roomIDLive).emit('Sever-send-dataLiveStop', dataLiveStop);
  // })
  
});


server.listen(port, () => {
  console.log(`Server Listening to port ${port}`);
});

