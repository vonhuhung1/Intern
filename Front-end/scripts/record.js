const btn = document.getElementById("btn-record")
const btn2 = document.getElementById("btn-download")

//Get screen & get data screen record
let time1;
btn.addEventListener("click", async function () {
    let stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
    })
    time1 = Date.now();
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

let time2;
mediaRecorder.addEventListener('stop', function(){
    let blob = new Blob(chunks, {
        type: chunks[0].type
    })
    let url = URL.createObjectURL(blob)
    let video = document.querySelector("video")
    video.src = url
    //Event download
    btn2.onclick = () => {
        let a = document.createElement('a')
        a.href = url
        a.download = 'video.webm'
        a.click();
    }
    //Get length record
    time2  = Date.now()
    let time = (time2 - time1)/1000
    // time = Math.trunc(time);
    document.getElementById("get-date").innerHTML = getDate();
    document.getElementById("get-size").innerHTML =  blob.size + " bytes";
    document.getElementById("get-time").innerHTML = time + "s";
    })
    mediaRecorder.start()
})

function getDate(){
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    return today = dd + '/' + mm + '/' + yyyy;;
}

