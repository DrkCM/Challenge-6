// variable to keep track of quiz state
let currentQuestionIndex = 0;
let time = questions.length * 15;
let timerID;

// import DOM HTML elements;
let questionsElement = document.getElementById('questions');
let timerElement = document.getElementById('time');
let choicesElement = document.getElementById('choices');
let submitButton = document.getElementById('submit');
let startButton = document.getElementById('start');
let initialElement = document.getElementById('initials');
let feedBackElement = document.getElementById('feedback');


// sound effects for RIGHT or WRONG answers
let sfxRight = new Audio('assets/sfx/correct.wav');
let sfxWrong = new Audio('assets/sfx/incorrect.wav');

// This function is for abailable time for your answer
function questionClick() {
   if(this.value !== questions[currentQuestionIndex].answer) { //if time is bigger than currentQuestionIndex you have time to answer
    time -= 15;

    if(time < 0) { // Time is 0 you have no more time to answer
        time = 0;
    }

    timerElement.textContent = time;

    sfxWrong.play();
    feedBackElement.textContent = 'Wrong' //if answer is wrong you will receive the wrong sound
   } else {
    sfxRight.play();
    feedBackElement.textContent = 'Correct!'; //if answer is good you will receive the good sound
   }

   feedBackElement.setAttribute('class', 'feedback');

   //this function control the time out and hide the feedback (good/wrong)
   setTimeout(function() { 
    feedBackElement.setAttribute('class', 'feedback hide')
   }, 1000);

   currentQuestionIndex++;

   // if there are no more questions end the game if there are more jump to the next,
   if(currentQuestionIndex === questions.length) { 
    quizEnd()
   } else {
    getQuestion();
   }
}

//this function shows the question text
function getQuestion() { 
   let currentQuestion = questions[currentQuestionIndex];

   let titleElement = document.getElementById('question-title');

   titleElement.textContent = currentQuestion.title;

   choicesElement.innerHTML = "";

    //this function show you the different answer you can choice
   currentQuestion.choices.forEach(function(choice, index) {
      let choiceButton = document.createElement('button');

      choiceButton.setAttribute('class', 'choice');
      choiceButton.setAttribute('value', choice);

      choiceButton.textContent = `${index + 1}. ${choice}`

      choiceButton.addEventListener('click', questionClick);

      choicesElement.append(choiceButton);
   }) 
}

// this function show you what happend when game is over
function quizEnd() {
  clearInterval(timerID);

   let endScreenElement = document.getElementById('end-screen');
   endScreenElement.removeAttribute('class');

   let finalScoreElement = document.getElementById('final-score'); //show you your score
   finalScoreElement.textContent = time;

   questionsElement.setAttribute('class', 'hide');
}

function clockTick() { //this function finsh the game when time is 0
   time--;
   timerElement.textContent = time;

   if(time <= 0){
       quizEnd();
   }
}

// This function start the game when you click the button
function startQuiz() {
   let startScreenElement = document.getElementById('start-screen');
   startScreenElement.setAttribute('class', 'hide');

   questionsElement.removeAttribute('class');

   timerID = setInterval(clockTick, 1000)

   timerElement.textContent = time;

   getQuestion();
}

// This function save your score in the scorespage
function saveHighScore() {
   let initials = initialElement.value.trim();

   // ask for your initial before save the score
   if(initials !== ""){
      let highScore = JSON.parse(localStorage.getItem('highscores')) || [];
      let newScore = {
        score: time,
        initials: initials
      }
   
      // safe the scores
      highScore.push(newScore);
      localStorage.setItem('highscores', JSON.stringify(highScore));

      window.location.href = 'highscores.html';
    }
}

//save the result when you press enter
function checkForEnter(event) {
   if(event.key === 'Enter') {
    saveHighScore();
   }
}

//start button
startButton.addEventListener('click', startQuiz);

//submit button
submitButton.addEventListener('click', saveHighScore);

//save initials after type
initialElement.addEventListener('keyup', checkForEnter);  
