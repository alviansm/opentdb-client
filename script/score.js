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

// Add event listener
btnSubmitScoreAgree.addEventListener("click", highlight);

// Declare global variable
let hightlightHtml = ``;
let compliment = ``;

// Functions
function highlight() {
    for (let i=0; i<userAnswer.length; i++) {
        if (userAnswer[i] == correctAnswers[i]) {
            score++
        }
    }

    // Compliment settings
    if (score > 0) {
        compliment = `1000 Steps start with 1`
    }
    if (score > 4) {
        compliment = `You're getting better at it, keep learning!`
    }
    if (score > 7) {
        compliment = `Your're quite good at this`
    }
    if (score > 9) {
        compliment = `You're exellente at this!`
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
}