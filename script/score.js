/*
    @author: @alviansm
    author: Alvians Maulana
    github: https://github.com/alviansm
*/

// Get DOM elements
const btnSubmitScore = document.getElementById("button_user_submit");
const btnSubmitScoreAgree = document.getElementById("button_user_submit_agree");
const warningEmptyEl = document.getElementById("warning_no_answer");
const warningHighlight = document.getElementById("user_highlight");
const btnShareWA = document.getElementById("button_share_wa");
const btnCloseHigh = document.getElementById("button_close_highlights");
let analysisEl = document.getElementById("analysis");

// Add event listener
btnSubmitScoreAgree.addEventListener("click", highlight);
btnCloseHigh.addEventListener("click", closeHigh);

// Declare global variable
let hightlightHtml = ``;
let compliment = ``;
let analysisHtml = ``;

// Share whatsapp API
let whatsAppURL = `https://wa.me?text=${encodeURIComponent('I got ${score} out of ${maxScore} from opentdb quiz! check it at: https://google.com')}`;

// Functions
function highlight() {    
    console.log(questions.results);
    // Answer correction
    for (let i=0; i<userAnswer.length; i++) {
        if (userAnswer[i] == correctAnswers[i]) {
            score = score + 1;
        }
        else {
            score = score;
        }
    }

    // Compliment settings
    if (score > 0) {
        compliment = `1000 Steps start with 1`
    }
    if (score > (userAnswer.length/4)) {
        compliment = `Keep grindin!`
    }
    if (score > (userAnswer.length/3)) {
        compliment = `You're getting better at it!`
    }
    if (score > (userAnswer.length/2)) {
        compliment = `Keep up the work!`
    }
    if (score > (userAnswer.length/1.5)) {
        compliment = `You're quite good at this, keep up!`
    }
    if (score >= (userAnswer.length/1)) {
        compliment = `Excellente!`
    }

    highlight = `
        <div class="col-sm-6">
            <div class="card">
            <div class="card-body">
                <h5 class="card-title">Total Correct Answer</h5>
                <p class="card-text">
                    Your score: ${score} <br>
                    Question number: ${userAnswer.length} <br>
                    <blockquote>${compliment}</blockquote>
                </p>
            </div>
            </div>
        </div>    
    `;

    if (score > 0) {
    warningEmptyEl.innerHTML = `<p>🥳 Congratulations!</p>`;
    warningHighlight.innerHTML = highlight;
    }

    // Analysis
    if (questions.results) {
        for (let i=0; i<questions.results.length; i++) {
            analysisHtml += `
            <tr>
                <th scope="row">${i+1}</th>
                <td>${questions.results[i].question}</td>
                <td>${userAnswer[i]}</td>
                <td>${correctAnswers[i]}</td>
            </tr>
            `;
        }
        analysisEl.innerHTML = analysisHtml;
    }

}

function closeHigh() {
    // Reset (Refresh page)
    window.location.reload();
}