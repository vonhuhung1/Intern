const socket = io.connect('http://localhost:3000')

const room = document.getElementById('input-room');

document.getElementById('btn-create').addEventListener('click',recordClick,true);

function recordClick(){
    window.location.href = "createRoom.html";
}

document.getElementById('btn-join').addEventListener('click',joinClick,true);
function joinClick(){
    document.getElementById('btn-create').style.display = 'none';
    document.getElementById('input-room').style.display = 'block';
}

document.getElementById('btn-join').addEventListener('dblclick',joinClick2,true)
function joinClick2() {
    if(room.value=="") { alert("Please enter your friend's room")}
    else{
        chrome.windows.create({
                url: 'http://localhost:5501/joinLiveStream.html'
            });
        }
        socket.emit("Room-Join",room.value)

} 
