let startBtn = document.getElementById("start");
let pauseBtn = document.getElementById("Pause");
let lapsBtn = document.getElementById("laps");
let resetBtn = document.getElementById("reset");
let timeDisplay = document.getElementById("time");

let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

let lapContainer = document.getElementById("lap-list");

// Format time to HH:MM:SS:MS
function formatTime(ms) {
  let milliseconds = Math.floor((ms % 1000) / 10); // 2 digits
  let totalSeconds = Math.floor(ms / 1000);
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds % 3600) / 60);
  let seconds = totalSeconds % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}:${String(milliseconds).padStart(
    2,
    "0"
  )}`;
}

function updateDisplay() {
  let now = Date.now();
  let timePassed = now - startTime + elapsedTime;
  timeDisplay.textContent = formatTime(timePassed);
}

// Start
startBtn.addEventListener("click", () => {
  if (!running) {
    running = true;
    startTime = Date.now();
    timerInterval = setInterval(updateDisplay, 10);
  }
});

// Pause
pauseBtn.addEventListener("click", () => {
  if (running) {
    running = false;
    clearInterval(timerInterval);
    elapsedTime += Date.now() - startTime;
  }
});

// Reset
resetBtn.addEventListener("click", () => {
  running = false;
  clearInterval(timerInterval);
  startTime = 0;
  elapsedTime = 0;
  timeDisplay.textContent = "00:00:00:00";
  lapContainer.innerHTML = "";
});

// Laps
lapsBtn.addEventListener("click", () => {
  if (running) {
    let now = Date.now();
    let lapTime = now - startTime + elapsedTime;
    let lapItem = document.createElement("li");
    lapItem.textContent = formatTime(lapTime);
    lapContainer.appendChild(lapItem);
  }
});
