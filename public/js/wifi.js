const wifiElement = document.querySelector('.offline');
const base = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-dot-icon lucide-dot"><circle cx="12.1" cy="12.1" r="1"/></svg>`

function completeWifi(currentline) {
    return base + currentline.toString();
}

let line;
let lineColor;

if (navigator.onLine) {
    line = "Online";
    lineColor = "rgb(2, 218, 2)";
} else {
    line = "Offline";
    lineColor = "red";
}

wifiElement.innerHTML = completeWifi(line);
wifiElement.setAttribute('style', `color: ${lineColor}`);

let publicLine;

function broadcastLine() {
    if (line === "Online") {
        window.top.line = 1;
    } else {
        window.top.line = 0;
    }
}

broadcastLine();