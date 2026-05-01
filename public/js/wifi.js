// ==============================
// Wi-Fi JS at /js/wifi.js
// ==============================

// Defining the main variables (the wifi element, and the svg base for the full wifi string)
const wifiElement = document.querySelector('.offline');
const base = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-dot-icon lucide-dot"><circle cx="12.1" cy="12.1" r="1"/></svg>`

// Completes the full wifi string to include the dot (svg)
function completeWifi(currentline) {
    return base + currentline.toString();
}

// Defining variables for if/else sanboxed use for outer window.
let line;
let lineColor;

// Checks if the device is connected to the wifi and sets the color and gives offline or online
if (navigator.onLine) {
    line = "Online";
    lineColor = "rgb(2, 218, 2)";
} else {
    line = "Offline";
    lineColor = "red";
}

// Makes the value of the wifi element the full wifi string (right color, includes svg, and if it's online or offline)
wifiElement.innerHTML = completeWifi(line);
wifiElement.setAttribute('style', `color: ${lineColor}`);