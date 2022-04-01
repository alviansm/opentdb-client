// Author: Alvians Maulana (@alviansm -> https://github.com/alviansm)
const questionContainer = document.getElementById("container_question");
const forms = document.getElementById("forms");
const statusLoadQuiz = document.getElementById("status_load_quiz");
const spanUsername = document.getElementById("span_username");
const alertQuestions = document.getElementById("alert_no_questions");
const questionPagination = document.getElementById("question_pagination");

// Fields
const fieldUsername = document.getElementById("username");

// Load the quiz event
const btnLoadQuiz = document.getElementById("btn_load_questions");
btnLoadQuiz.addEventListener("click", loadQuiz);

// Start the pre quiz event (shows modal)
const btnStartQuiz = document.getElementById("btn_start_questions");
btnStartQuiz.addEventListener("click", loadUsername);

// Start the quiz event
const btnStart = document.getElementById("btn_start");
btnStart.addEventListener("click", start);

// Global variable declarations
let username = 'John Doe';
let questions = {};
let score = 0;
let maxScore = 0;
let outputQuestion = [];
let outputAnswer = [];
let currentQuestion = 0;
let currentQuestionHtml = ``;
let tempArr = [];
let outputPagination = ``;
let myPagination = {};

// Share whatsapp API
let whatsAppURL = `https://wa.me?text=${encodeURIComponent('I got ${score} out of ${maxScore} from opentdb quiz! check it at: https://google.com')}`;

// @ts-nocheck
// Functions for eventlistener

// Start the question
function start() {
    if (Object.keys(questions).length > 0) {
        // Close the modal
        var myModalEl = document.getElementById('staticBackdrop');
        var modal = bootstrap.Modal.getInstance(myModalEl);
        modal.hide();

        // Map the questions -> push to outputQuestion variable
        questions.results.map((question) => {
          outputQuestion.push(
                `
                <!-- Question -->
                <div id="question">
                  <p class="lead">${question.question}</p>
                </div>
                `
            );
        });
        tempArr = outputQuestion.filter(q => outputQuestion.indexOf(q) == currentQuestion);
        currentQuestionHtml = tempArr[0];
        questionContainer.innerHTML = currentQuestionHtml;

        // Map pagination
        outputQuestion.map(q => {
          outputPagination += `<li id="question_${outputQuestion.indexOf(q)+1}" class="page-item"><a class="page-link" style="cursor: pointer;">${outputQuestion.indexOf(q)+1}</a></li>`;
        });
        questionPagination.innerHTML = outputPagination; 
        
        // Dynamically create variable from available pagination (number of question)
        let varNames = [];
        for (let i=0; i<outputQuestion.length; i++) {
          varNames.push("btnPagination_"+(i+1).toString());
        };
        
        // WARNING!!! NOT BEST PRACTICES!
        for (let i=0; i<varNames.length; i++) {
          window[varNames[i]] = document.getElementById(`question_${i+1}`).addEventListener("click", switchQuestion);
          // Taking advantange of JavaScript as prototype-oriented promgramming language
          document.getElementById(`question_${i+1}`).myParam = i;
        };

        // Working navigation with pagination

        
    }
    
    else {
        questionContainer.innerHTML = `<p class="lead">No question available :(</p>`;
    }
}

// Swithch question from pagination (navigate through question)
function switchQuestion(evt) {
  currentQuestion = evt.currentTarget.myParam;
  tempArr = outputQuestion.filter(q => outputQuestion.indexOf(q) == currentQuestion);
  currentQuestionHtml = tempArr[0];
  questionContainer.innerHTML = currentQuestionHtml;
}

// Pre questions modal
function loadUsername() {
    username = fieldUsername.value;
    spanUsername.innerHTML = fieldUsername.value;

    if (Object.keys(questions).length == 0) {
        alertQuestions.classList.remove("d-none");
        btnStart.classList.add("d-none");
    }

    if (Object.keys(questions).length > 0) {
        alertQuestions.classList.add("d-none");
        btnStart.classList.remove("d-none");
    }
}

// Fetch questions
async function loadQuiz() {
    // Add spinnders the moment button is clicked
    statusLoadQuiz.innerHTML = `<div class="spinner-border" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>`;
    
    let url = `https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple`;
    
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        // Store to variable when successfull
        if (this.readyState == 4 && this.status == 200) {
            statusLoadQuiz.innerHTML = `<div><span class="badge bg-success">Question Loaded!</span></div>`

            let temp_questions = this.responseText;
            questions = JSON.parse(temp_questions);            
        }        
    }
    xhr.send();
};

let temp = `<!-- Question -->
<div id="question">
  <p class="lead">Lorem ipsum dolor sit amet.</p>
</div>
<!-- Answer: Multiple choices -->
<div id="choice" class="btn-group d-grid gap-3">          
  <div id="choice-a">
    <input type="radio" class="btn-check" name="choice-input" id="choice-a-answer" autocomplete="off" checked>
    <label for="choice-a-answer" class="btn btn-primary">A</label>
  </div>
  <div id="choice-b">
    <input type="radio" class="btn-check" name="choice-input" id="choice-b-answer" autocomplete="off">
    <label for="choice-b-answer" class="btn btn-primary">B</label>
  </div>
  <div id="choice-c">
    <input type="radio" class="btn-check" name="choice-input" id="choice-c-answer" autocomplete="off">
    <label for="choice-c-answer" class="btn btn-primary">C</label>
  </div>
  <div id="choice-d">
    <input type="radio" class="btn-check" name="choice-input" id="choice-d-answer" autocomplete="off">
    <label for="choice-d-answer" class="btn btn-primary">D</label>
  </div>
</div> <!-- End of multiple choices answer -->        
</div>
<p>Your answer: <span class="badge bg-secondary">A</span></p>`;