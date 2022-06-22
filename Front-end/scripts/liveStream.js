const socket = io.connect("http://localhost:3000");

socket.on("Sever-send-room", (roomIdLive) => {
  const video = document.querySelector("video");
  const start = document.getElementById("start");
  const stop = document.getElementById("stop");
  const btn = document.getElementById("btn-senddatalive");
  const peer = new Peer(roomIdLive);

  //Custom peerid
  peer.on("open", (id) => {
    document.getElementById("room-id").innerHTML = id;
    socket.emit("User", id);
  });

  //Option 
  const displayMediaOptions = {
    video: {
      cursor: "always",
    },
    audio: false,
  };

  start.onclick = () => startSharing();

  stop.onclick = () => stopSharing();

  function displayScreen(stream) {
    video.srcObject = stream;
    video.onloadedmetadata = () => {
      video.play();
    };
  }
  
  //Choose screen & get screen
  let streams;
  async function startSharing() {
    await navigator.mediaDevices
      .getDisplayMedia(displayMediaOptions)
      .then(stream => {
        streams = stream;
      })
      .catch(error => {
        console.log(error);
      });
  }

  function stopSharing() {
    displayScreen(null, () => {
      let tracks = videoElem.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    });
  }

  //Create connect peer-peer
  btn.addEventListener("click", () => {
    roomSend = document.getElementById("txt-roomid").value;
    var call = peer.call(roomSend, streams);
    call.on("stream", (remoteStream) => displayScreen(remoteStream));
  });

  peer.on("call", (call) => {
    call.answer(streams);
    call.on("stream", (remoteStream) => displayScreen(remoteStream, video));
  });
});
