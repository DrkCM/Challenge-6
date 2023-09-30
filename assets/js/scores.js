// function for show the scores after you end game
function printHighScores(){
let highScores = JSON.parse(localStorage.getItem('highscores')) || []; // show the score in scorespage


highScores.sort(function(a, b) {
    return b.score - a.score; // explain
})

// this function is for create a score list and will be shoed when you finish the game (showing scores from higher to lower)
highScores.forEach(function(score) { 
    let li = document.createElement('li');  //
    li.textContent = `${score.initials} - ${score.score}` //

    let ol = document.getElementById('highscores');
    ol.appendChild(li);
})
}

//this function erase the scores frm the system
function clearHighScores(){
   localStorage.removeItem('highscores');
   window.location.reload();
}

// define button to remove the scores
let clearButton =  document.getElementById('clear');
clearButton.addEventListener('click', clearHighScores);

printHighScores();
