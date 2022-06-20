const btn = document.getElementById("btn-recordpage")
const btn2 = document.getElementById("btn-livestreampage")

btn.addEventListener("click", () => {
    chrome.windows.create({
    url:'http://localhost:5501/record.html'
    });
})

btn2.addEventListener("click", () => {
    chrome.windows.create({
        url:'http://localhost:5501/liveStream.html'
    });
})