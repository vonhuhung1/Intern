const socket = io.connect('http://localhost:3000');

socket.on("Sever-send-roomLive",roomId => {
    document.getElementById("Room-id").innerHTML = roomId;})
        
    let btn4 = document.getElementById('btn-sendDataLive')
    btn4.addEventListener("click", () => {
        roomSend = document.getElementById("txt_roomId2").value;
        console.log(roomSend);
        socket.emit("Send-roomLive",roomSend);
})
    
socket.on("Sever-send-dataLiveStart", data => {
    let video = document.querySelector("video");
    video.src  = data; 
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
    video.srcObject = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
    console.log(await navigator.mediaDevices.getDisplayMedia(displayMediaOptions));
    // screenShot().then((img) => {
    //     var imgStr = new video.srcObject(img).toString('base64');

    //     var obj = imgStr;

    //     socket.emit("Startshare-data", obj);
    // })
    } catch (error) {
        console.log(error);
    }
}
function stopSharing() {
    let tracks = video.srcObject.getTracks();
    tracks.forEach((track) => track.stop());
    video.srcObject = null;
    // socket.emit("StopShare-Data",false)
}