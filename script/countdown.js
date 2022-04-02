const timerEl = document.getElementById("timer");
timerEl.innerHTML = `00:00`;

// Call function every 1000ms
setInterval(updateCountdown, 1000);

function updateCountdown() {
    let minutes = Math.floor(timer/60);
    let seconds = timer%60;

    timerEl.innerHTML = `${minutes}:${seconds}`;
    timer--;

    if (timer < 0) {
        timer = 0;
    }
}