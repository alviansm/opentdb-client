const timerEl = document.getElementById("timer");
timerEl.innerHTML = `00:00`;

function updateCountdown() {
    let minutes = Math.floor(timer/60);
    let seconds = timer%60;

    timerEl.innerHTML = `${minutes}:${seconds}`;
    timer--;

    if (timer < 0) {
        timer = 0;
                
        btnSubmitScore.click();
        btnSubmitScoreAgree.click();
        clearInterval(timerInterval);
    }
}