const socket = io.connect('http://localhost:3000');

socket.on("Sever-send-roomLive",roomIdLive => {
    console.log(roomIdLive);
    document.getElementById("Room-id").innerHTML = roomIdLive;})
        
    let btn4 = document.getElementById('btn-sendDataLive')
    btn4.addEventListener("click", () => {
        roomSend = document.getElementById("txt_roomId").value;
        socket.emit("Send-roomLive",roomSend);
})
    
socket.on("Sever-send-dataLiveStart", data => {
    console.log(data);
    let video = document.querySelector("video");
    video.src = data;
})

// socket.on("Sever-send-data-end"), data => {
//     data = null ;
// }
const video = document.querySelector("video");
const start = document.getElementById("start");
const stop = document.getElementById("stop");

var displayMediaOptions = {
    video: {
    cursor: "always", 
},
    audio: true,
};

start.onclick = function (e) {
    startSharing();
};
stop.onclick = function (e) {
    stopSharing();
};

async function startSharing() {
    try {
    let stream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
    video.srcObject = stream;
    const mime = MediaRecorder.isTypeSupported("video/webm; codecs=vp9") 
            ? "video/webm; codecs=vp9" 
            : "video/webm"
    let mediaRecorder = new MediaRecorder(stream, {
        mimeType: mime
    }) 
    let chunks = []
    mediaRecorder.addEventListener('dataavailable', function(e) {
        chunks.push(e.data)
    })
        let blob = new Blob(chunks, {
        type: chunks[0]
    })
        console.log(blob);
        let url = URL.createObjectURL(blob);
        console.log(url)
        socket.emit("StartShare-Data",url);
    } catch (error) {
        console.log(error);
    }
}
function stopSharing() {
    let tracks = video.srcObject.getTracks();
    tracks.forEach(track => track.stop());
    video.srcObject = null;
    // socket.emit("StopShare-Data",false)
}