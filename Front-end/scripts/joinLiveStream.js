const socket = io.connect('http://localhost:3000');

socket.on("Send-Room-Create", roomId => {
    document.getElementById("Room-id").innerHTML = roomId;
})

const peer = new Peer();

peer.on('open',id => {
    socket.emit("User", id);
});

const video = document.querySelector("video");
const start = document.getElementById("start");
const stop = document.getElementById("stop");

var displayMediaOptions = {
    video: {
    cursor: "always", 
},
    audio: false,
};

start.onclick = () => startSharing();

stop.onclick = () => stopSharing()

function displayScreen(stream){
    video.srcObject = stream;
    video.onloadedmetadata = () => {
        video.play();
    }
}

var streams ;
async function startSharing() {
    await navigator.mediaDevices.getDisplayMedia(displayMediaOptions)
        .then(stream => {
            streams = stream;
        })
        .catch(error => {
            console.log(error);
        })
}

function stopSharing() {
    displayScreen(null,() => {
        let tracks = videoElem.srcObject.getTracks();
        tracks.forEach(track => track.stop());
    });
}  

let btn4 = document.getElementById('btn-sendDataLive')
 btn4.addEventListener("click", () => {
    roomSend = document.getElementById("txt_roomId").value;
    var call = peer.call(roomSend,streams)
    call.on('stream', remoteStream => displayScreen(remoteStream))
}) 

peer.on("call", call => {
    call.answer(streams);
    call.on('stream', remoteStream => displayScreen(remoteStream,video))
})
