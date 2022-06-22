const socket = io.connect("http://localhost:3000");

const video = document.querySelector("video");

socket.on("send-rooms",rooms=> {
  console.log(rooms);
})

socket.on("Sever-send-room", (id) => {
  // custom peer id
  const peer = new Peer(id);
  

  peer.on("open", (peerId) => {
    socket.emit("User-Join", peerId);
    console.log(peerId);
  });

  socket.on("Send-Room-Create",room => {
    document.getElementById("room-id").innerHTML = room;
  })
  function displayScreen(stream) {
    video.srcObject = stream;
    video.onloadedmetadata = () => {
      video.play();
    };
  }
  let streams;
  // Create connect peer-peer  
  peer.on("call", (call) => {
    call.answer(streams);
    call.on("stream", (remoteStream) => displayScreen(remoteStream, video));
  });
});
