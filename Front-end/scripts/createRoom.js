let btn = document.querySelector(".recordPage-btn")

btn.addEventListener("click", async function () {
    chrome.windows.create({
    url:'http://localhost:5501/record.html'
    });
})

let btn2 = document.querySelector(".liveStreamPage-btn")

btn2.addEventListener("click", async function () {
    chrome.windows.create({
        url:'http://localhost:5501/liveStream.html'
    });
})