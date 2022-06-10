const socket = io.connect('http://localhost:3000')

document.getElementById('buttonCreate').addEventListener('click',recordClick,true);

function recordClick(){
    window.location.href = "createRoom.html";
}

document.getElementById('buttonJoin').addEventListener('click',joinClick,true);
function joinClick(){
    document.getElementById('buttonCreate').style.display = 'none';
    document.getElementById('inputabc').style.display = 'block';
}

document.getElementById('buttonJoin').addEventListener('dblclick',joinClick2,true)
const room = document.getElementById('input2');
function joinClick2() {
    if(room.value=="") { alert("Please enter your friend's room")}
    else{
        chrome.windows.create({
                url: 'http://localhost:5501/record.html'
            });
            socket.emit("Client-send-room-data",room.value)
        }
} 
