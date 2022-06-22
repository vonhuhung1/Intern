const socket = io.connect('http://localhost:3000')

const room = document.getElementById('input-join');

document.getElementById('btn-create').addEventListener('click',recordClick,true);

function recordClick(){
    window.location.href = "createRoom.html";
}

document.getElementById('btn-join').addEventListener('click',joinClick);
function joinClick(){
    document.getElementById('btn-create').style.display = 'none';
    document.getElementById('input-room').style.display = 'block';
}

document.getElementById('btn-join').addEventListener('dblclick',joinClick2,false)
function joinClick2() {
    socket.emit("Room-Join",room.value)
    socket.on("Status",status => {
            if(room.value==""){
                alert("Please enter your room's friend")
            }else if(status === true){
                chrome.windows.create({
                    url: 'http://localhost:5501/joinLiveStream.html'
                });
                window.close();
            }
            else {
                alert(room.value + " is not defind")
            }
            document.getElementById('btn-join').removeEventListener("click")
    })
} 
