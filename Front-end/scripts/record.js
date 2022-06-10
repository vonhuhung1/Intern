const socket = io.connect('http://localhost:3000')

socket.on("Sever-send-data", record => {
    let video = document.querySelector("video");
    video.src = record;
})

socket.on("Sever-send-room",roomId => {
    document.getElementById("Room-id").innerHTML = roomId;
})

let btn4 = document.getElementById('btn-sendData')
btn4.addEventListener("click", () => {
    roomSend = document.getElementById("txt_roomId2").value;
    socket.emit("Send-room",roomSend);
})

let btn = document.querySelector(".record-btn")
btn.addEventListener("click", async function () {
    let stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
    })
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

mediaRecorder.addEventListener('stop', function(){
    let blob = new Blob(chunks, {
        type: chunks[0].type
    })
    let url = URL.createObjectURL(blob)
    let video = document.querySelector("video")
    video.src = url                 
    socket.emit("Client-send-data", url)
    })
    mediaRecorder.start()
})