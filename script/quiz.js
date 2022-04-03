// Author: Alvians Maulana (@alviansm -> https://github.com/alviansm)
const questionContainer = document.getElementById("container_question");
const forms = document.getElementById("forms");
const statusLoadQuiz = document.getElementById("status_load_quiz");
const spanUsername = document.getElementById("span_username");
const alertQuestions = document.getElementById("alert_no_questions");
const questionPagination = document.getElementById("question_pagination");
const badgeCurrentQuestion = document.getElementById("current_question");

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
let currentQuestion = 0;
let currentQuestionHtml = ``;
let tempArr = [];
let outputPagination = ``;
let myPagination = {};
let outputAnswer = [];
let singleAnswer = [];
let correctAnswers = [];
let answerHtml = [];
let activeAnswerHtml = ``;
let timer = 0;
let timerInterval;

// User answer
let userAnswer = [];

// @ts-nocheck
// Functions for eventlistener

// Start the question
function start() {
    if (Object.keys(questions).length > 0) {
        // Close the modal
        var myModalEl = document.getElementById('staticBackdrop');
        var modal = bootstrap.Modal.getInstance(myModalEl);
        modal.hide();

        // Reset the stats    
        btnStartQuiz.classList.add("d-none");  
        score = 0;  
        outputQuestion = [];
        currentQuestion = 0;
        currentQuestionHtml = ``;
        tempArr = [];
        outputPagination = ``;
        myPagination = {};
        outputAnswer = [];
        singleAnswer = [];
        correctAnswers = [];
        answerHtml = [];
        activeAnswerHtml = ``;

        // Set initial user answer
        for (let i=0; i<questions.results.length; i++) {
          userAnswer.push("")
        }

        // Set timer (countdown)
        // set timer based on questions length
        timer = questions.results.length*10;
        timerInterval = setInterval(updateCountdown, 1000);

        // Map the questions -> push to outputQuestion variable
        questions.results.map((question) => {
          outputQuestion.push(
                `
                <!-- Question -->
                <div id="question">
                  <p class="lead">${question.question}</p>
                </div>
                <div id="question_options">
                
                </div>
                <div id="user_answer" class="mb-3">
                  <span class="badge bg-success">Your answer: ${userAnswer[currentQuestion]}</span>
                </div>
                `
            );
        });

        // Map pagination
        outputPagination += `<li class="page-item col" id="previous_question">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>`;
        outputQuestion.map(q => {
          outputPagination += `<li id="question_${outputQuestion.indexOf(q)+1}" class="page-item col"><a class="page-link" style="cursor: pointer;">${outputQuestion.indexOf(q)+1}</a></li>`;
        });
        outputPagination += `<li class="page-item" id="next_question" class="col">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>`;
        questionPagination.innerHTML = outputPagination; 
        
        // Next and previous pagination
        document.getElementById("previous_question").addEventListener("click", ()=> {
          if (currentQuestion > 0) {
            currentQuestion = currentQuestion - 1
            // Switch questions
            tempArr = outputQuestion.filter(q => outputQuestion.indexOf(q) == currentQuestion);
            currentQuestionHtml = tempArr[0];
            questionContainer.innerHTML = currentQuestionHtml;
            document.getElementById("user_answer").innerHTML = `<span class="badge bg-success">Your answer: ${userAnswer[currentQuestion]}</span>`;  
            badgeCurrentQuestion.innerHTML = `${currentQuestion+1}`;

            // Switch answers
            tempArr = answerHtml.filter(r => answerHtml.indexOf(r) == currentQuestion);
            activeAnswerHtml = tempArr[0];
            document.getElementById("question_options").innerHTML = activeAnswerHtml;
          
            // Save user answer
            document.getElementById("choice-a-answer").addEventListener("click", () => {
              userAnswer.splice(currentQuestion, 1, outputAnswer[currentQuestion][0])
              document.getElementById("user_answer").innerHTML = `<span class="badge bg-success">Your answer: ${userAnswer[currentQuestion]}</span>`;
            });
            document.getElementById("choice-b-answer").addEventListener("click", () => {
              userAnswer.splice(currentQuestion, 1, outputAnswer[currentQuestion][1])
              document.getElementById("user_answer").innerHTML = `<span class="badge bg-success">Your answer: ${userAnswer[currentQuestion]}</span>`;
            });
            document.getElementById("choice-c-answer").addEventListener("click", () => {
              userAnswer.splice(currentQuestion, 1, outputAnswer[currentQuestion][2])
              document.getElementById("user_answer").innerHTML = `<span class="badge bg-success">Your answer: ${userAnswer[currentQuestion]}</span>`;
            });
            document.getElementById("choice-d-answer").addEventListener("click", () => {
              userAnswer.splice(currentQuestion, 1, outputAnswer[currentQuestion][3])
              document.getElementById("user_answer").innerHTML = `<span class="badge bg-success">Your answer: ${userAnswer[currentQuestion]}</span>`;
            });
          }
          else {
            currentQuestion = 0;
          }
        });
        document.getElementById("next_question").addEventListener("click", ()=> {
          if (currentQuestion < questions.results.length-1) {
            currentQuestion = currentQuestion + 1
            // Switch questions
            tempArr = outputQuestion.filter(q => outputQuestion.indexOf(q) == currentQuestion);
            currentQuestionHtml = tempArr[0];
            questionContainer.innerHTML = currentQuestionHtml;
            document.getElementById("user_answer").innerHTML = `<span class="badge bg-success">Your answer: ${userAnswer[currentQuestion]}</span>`;
            badgeCurrentQuestion.innerHTML = `${currentQuestion+1}`;

            // Switch answers
            tempArr = answerHtml.filter(r => answerHtml.indexOf(r) == currentQuestion);
            activeAnswerHtml = tempArr[0];
            document.getElementById("question_options").innerHTML = activeAnswerHtml;

            // Save user answer
            document.getElementById("choice-a-answer").addEventListener("click", () => {
              userAnswer.splice(currentQuestion, 1, outputAnswer[currentQuestion][0])
              document.getElementById("user_answer").innerHTML = `<span class="badge bg-success">Your answer: ${userAnswer[currentQuestion]}</span>`;
            });
            document.getElementById("choice-b-answer").addEventListener("click", () => {
              userAnswer.splice(currentQuestion, 1, outputAnswer[currentQuestion][1])
              document.getElementById("user_answer").innerHTML = `<span class="badge bg-success">Your answer: ${userAnswer[currentQuestion]}</span>`;
            });
            document.getElementById("choice-c-answer").addEventListener("click", () => {
              userAnswer.splice(currentQuestion, 1, outputAnswer[currentQuestion][2])
              document.getElementById("user_answer").innerHTML = `<span class="badge bg-success">Your answer: ${userAnswer[currentQuestion]}</span>`;
            });
            document.getElementById("choice-d-answer").addEventListener("click", () => {
              userAnswer.splice(currentQuestion, 1, outputAnswer[currentQuestion][3])
              document.getElementById("user_answer").innerHTML = `<span class="badge bg-success">Your answer: ${userAnswer[currentQuestion]}</span>`;
            });
          }
          else {            
            currentQuestion = currentQuestion;
          }
        });
        
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

        // Mix all answer into one array + Shuffle the array
        for (let i=0; i<questions.results.length; i++) {          
          singleAnswer = [];
          singleAnswer.push(questions.results[i]["correct_answer"]);
          correctAnswers.push(questions.results[i]["correct_answer"]);
          for (let j=0; j<questions.results[i]["incorrect_answers"].length; j++) {
            singleAnswer.push(questions.results[i]["incorrect_answers"][j]);
          }
          shuffle(singleAnswer);          
          outputAnswer.push(singleAnswer);
        }        
        // console.log(correctAnswers); // OK!
        // console.log(outputAnswer); // OK!
        outputAnswer.map(a => {
          answerHtml.push(
            `
            <!-- Answer: Multiple choices -->
            <div id="choice" class="btn-group d-grid gap-3">          
              <div id="choice-a">
                <input type="radio" class="btn-check" name="choice-input" id="choice-a-answer" autocomplete="off" checked>
                <label for="choice-a-answer" class="btn btn-primary">${a[0]}</label>
              </div>
              <div id="choice-b">
                <input type="radio" class="btn-check" name="choice-input" id="choice-b-answer" autocomplete="off">
                <label for="choice-b-answer" class="btn btn-primary">${a[1]}</label>
              </div>
              <div id="choice-c">
                <input type="radio" class="btn-check" name="choice-input" id="choice-c-answer" autocomplete="off">
                <label for="choice-c-answer" class="btn btn-primary">${a[2]}</label>
              </div>
              <div id="choice-d">
                <input type="radio" class="btn-check" name="choice-input" id="choice-d-answer" autocomplete="off">
                <label for="choice-d-answer" class="btn btn-primary">${a[3]}</label>
              </div>
            </div> <!-- End of multiple choices answer -->            
            `
          );
        });

        tempArr = outputQuestion.filter(q => outputQuestion.indexOf(q) == currentQuestion);
        currentQuestionHtml = tempArr[0];
        questionContainer.innerHTML = currentQuestionHtml;
        tempArr = answerHtml.filter(r => answerHtml.indexOf(r) == currentQuestion);
        activeAnswerHtml = tempArr[0];
        document.getElementById("question_options").innerHTML = activeAnswerHtml;                
        
        // Save user answer
        document.getElementById("choice-a-answer").addEventListener("click", () => {
          userAnswer.splice(currentQuestion, 1, outputAnswer[currentQuestion][0])
          document.getElementById("user_answer").innerHTML = `<span class="badge bg-success">Your answer: ${outputAnswer[currentQuestion][0]}</span>`;
        });
        document.getElementById("choice-b-answer").addEventListener("click", () => {
          userAnswer.splice(currentQuestion, 1, outputAnswer[currentQuestion][1])
          document.getElementById("user_answer").innerHTML = `<span class="badge bg-success">Your answer: ${outputAnswer[currentQuestion][1]}</span>`;
        });
        document.getElementById("choice-c-answer").addEventListener("click", () => {
          userAnswer.splice(currentQuestion, 1, outputAnswer[currentQuestion][2])
          document.getElementById("user_answer").innerHTML = `<span class="badge bg-success">Your answer: ${outputAnswer[currentQuestion][0]}</span>`;
        });
        document.getElementById("choice-d-answer").addEventListener("click", () => {
          userAnswer.splice(currentQuestion, 1, outputAnswer[currentQuestion][3])
          document.getElementById("user_answer").innerHTML = `<span class="badge bg-success">Your answer: ${outputAnswer[currentQuestion][0]}</span>`;
        });
     }
    
    else {
        questionContainer.innerHTML = `<p class="lead">No question available :(</p>`;
    }
}

// Array shuffle function (to shuffle the answers)
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]
    ];
  }

  return array;
}

// Swithch question from pagination (navigate through question)
function switchQuestion(evt) {
  currentQuestion = evt.currentTarget.myParam;
  
  // Switch questions
  tempArr = outputQuestion.filter(q => outputQuestion.indexOf(q) == currentQuestion);
  currentQuestionHtml = tempArr[0];
  questionContainer.innerHTML = currentQuestionHtml;

  // Switch answers
  tempArr = answerHtml.filter(r => answerHtml.indexOf(r) == currentQuestion);
  activeAnswerHtml = tempArr[0];
  document.getElementById("question_options").innerHTML = activeAnswerHtml;

  // Show user answer
  document.getElementById("user_answer").innerHTML = `<span class="badge bg-success">Your answer: ${userAnswer[currentQuestion]}</span>`;
  badgeCurrentQuestion.innerHTML = `${currentQuestion+1}`;

  // User answer options
  // Save user answer
  document.getElementById("choice-a-answer").addEventListener("click", () => {
    userAnswer.splice(currentQuestion, 1, outputAnswer[currentQuestion][0])
    document.getElementById("user_answer").innerHTML = `<span class="badge bg-success">Your answer: ${userAnswer[currentQuestion]}</span>`;
  });
  document.getElementById("choice-b-answer").addEventListener("click", () => {
    userAnswer.splice(currentQuestion, 1, outputAnswer[currentQuestion][1])
    document.getElementById("user_answer").innerHTML = `<span class="badge bg-success">Your answer: ${userAnswer[currentQuestion]}</span>`;
  });
  document.getElementById("choice-c-answer").addEventListener("click", () => {
    userAnswer.splice(currentQuestion, 1, outputAnswer[currentQuestion][2])
    document.getElementById("user_answer").innerHTML = `<span class="badge bg-success">Your answer: ${userAnswer[currentQuestion]}</span>`;
  });
  document.getElementById("choice-d-answer").addEventListener("click", () => {
    userAnswer.splice(currentQuestion, 1, outputAnswer[currentQuestion][3])
    document.getElementById("user_answer").innerHTML = `<span class="badge bg-success">Your answer: ${userAnswer[currentQuestion]}</span>`;
  });
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
    
    let url = `https://opentdb.com/api.php?amount=${selectAmount.value}&category=${selectCategory.value}&difficulty=${selectDifficulty.value}&type=multiple`;
    
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        // Store to variable when successfull
        if (this.readyState == 4 && this.status == 200) {
            statusLoadQuiz.innerHTML = `<div><span class="badge bg-success">Question Loaded!</span></div>`          

            let temp_questions = this.responseText;
            questions = JSON.parse(temp_questions);                        
            
            btnStartQuiz.classList.remove("d-none");  
        }        
    }  
    
    xhr.send();
};

// let temp = `<!-- Question -->
// <div id="question">
//   <p class="lead">Lorem ipsum dolor sit amet.</p>
// </div>
// <!-- Answer: Multiple choices -->
// <div id="choice" class="btn-group d-grid gap-3">          
//   <div id="choice-a">
//     <input type="radio" class="btn-check" name="choice-input" id="choice-a-answer" autocomplete="off" checked>
//     <label for="choice-a-answer" class="btn btn-primary">A</label>
//   </div>
//   <div id="choice-b">
//     <input type="radio" class="btn-check" name="choice-input" id="choice-b-answer" autocomplete="off">
//     <label for="choice-b-answer" class="btn btn-primary">B</label>
//   </div>
//   <div id="choice-c">
//     <input type="radio" class="btn-check" name="choice-input" id="choice-c-answer" autocomplete="off">
//     <label for="choice-c-answer" class="btn btn-primary">C</label>
//   </div>
//   <div id="choice-d">
//     <input type="radio" class="btn-check" name="choice-input" id="choice-d-answer" autocomplete="off">
//     <label for="choice-d-answer" class="btn btn-primary">D</label>
//   </div>
// </div> <!-- End of multiple choices answer -->        
// </div>
// <p>Your answer: <span class="badge bg-secondary">A</span></p>`;