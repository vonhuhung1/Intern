
// socket.on('connect',() => {
//     console.log("client connected");
// })

document.getElementById('buttonCreate').addEventListener('click',recordClick,true);

function recordClick(){
    window.location.href = "createRoom.html";
}

document.getElementById('buttonJoin').addEventListener('click',joinClick,true);
function joinClick(){
    document.getElementById('buttonCreate').style.display = 'none';
    document.getElementById('inputabc').style.display = 'block';
}

const a = document.getElementById('buttonJoin').addEventListener('click',joinClick2,false)
const room = document.getElementById('inputabc');
function joinClick2() {
    console.log(room.value);
    socket.on("Send-room-data", data =>{
      if(room.value == data){
        chrome.windows.create({
              url: 'http://localhost:5500/record.html'
        });
        socket.emit("client-send-data-room",room.value);
      }else alert("Room " + room.value +" is not defind")
    })
    //  else alert("Room "+room.value+" is not define");
} 

// if(data==true){
//   console.log(data);
//   chrome.windows.create({
//     url: 'http://localhost:5500/record.html'
//   });
// }else alert("Room " + data.value +" is not defind")