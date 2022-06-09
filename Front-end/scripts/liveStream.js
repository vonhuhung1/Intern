const socket = io.connect('http://localhost:3000');
const peer = new Peer();


// socket.on("Sever-send-roomLive",roomIdLive => {
//     document.getElementById("Room-id").innerHTML = roomIdLive;
// })      
peer.on('open', function(id) {
    document.getElementById("Room-id").innerHTML = id;
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

start.onclick = function (e) {
    startSharing();
};
stop.onclick = function (e) {
    stopSharing();
};
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
                displayScreen(stream);
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
        displayScreen(streams)
        var call = peer.call(roomSend,streams)
        call.on('stream', remoteStream => displayScreen(remoteStream))
}) 

peer.on("call", call => {
    displayScreen(streams,video);
    call.answer(streams);
    call.on('stream', remoteStream => displayScreen(remoteStream,video))
})