const qustionContainer = document.getElementById("container_question");
const forms = document.getElementById("forms");
const statusLoadQuiz = document.getElementById("status_load_quiz");

// Load the quiz event
const btnLoadQuiz = document.getElementById("btn_load_questions");
btnLoadQuiz.addEventListener("click", loadQuiz);

// Start the quiz event
const btnStartQuiz = document.getElementById("btn_start_questions");

let questions = {};

function loadQuiz() {
    // Add spinnders the moment button is clicked
    statusLoadQuiz.innerHTML = `<div class="spinner-border" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>`;
    
    let url = `https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple`;
    
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        // Store to variable when successfull
        if (this.readyState == 4 && this.status ==200) {
            statusLoadQuiz.innerHTML = `<div><span class="badge bg-success">Question Loaded!</span></div>`

            let temp_questions = this.responseText;
            return questions = JSON.parse(temp_questions);            
        }
        
        // Notice user to conect after 10 sec
        setTimeout(function() {
            statusLoadQuiz.innerHTML = `<div><span class="badge bg-danger">Please connect to the internet to be able to fetch questions from opentdb</span></div>`;
        }, 10000)
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