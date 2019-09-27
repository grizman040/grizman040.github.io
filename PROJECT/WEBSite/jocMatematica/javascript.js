var playing = false;
var score;
var action;
var timeRemaining;
var correctAnswer;

//if we click on the start/reset
document.getElementById("startGame").onclick = function () {

    // if we are playing
    if (playing == true) {
                            //reload page
        location.reload(); 
    } else {
        playing = true;
        score = 0;   // set score to 0
        document.getElementById("scorevalue").innerHTML = score;
        show("timer");// show countdown box
        timeRemaining = 60;
        document.getElementById("timerValue").innerHTML = timeRemaining;
        hide("gameOver");

        document.getElementById("startGame").innerHTML = "Reset Game";
hide("theme");


        //start CountDown
        startCountdown();
        // generate QA
        generateQA();

    }

};

// clicking on answer box
for(i=1; i<5; i++){
    document.getElementById("box"+i).onclick =
    function () {

        // check if we playing
        if (playing == true) {//yes
            if (this.innerHTML == correctAnswer) {
                score++;
                document.getElementById("scorevalue").innerHTML = score;
                // hide the wrongbox
                hide("wrongAnswer");
                show("correctAnswer");
                setTimeout(function () {
                    hide("correctAnswer");
                }, 1000);
                // generate new QA
                generateQA();
            } else {
                show("wrongAnswer");
                hide("correctAnswer");
                setTimeout(function () {
                    hide("wrongAnswer");
                }, 1000);
            }
        }

    }
}
// if we click on answer box
// if we are playing
// corect?
// yes
// increase score
// show corect score for 1sec
// generate new Q&A
// no
// show try again for 1 sec


// functions
// start countdown
function startCountdown() {
    action = setInterval(function () {
        timeRemaining -= 1;

        document.getElementById("timerValue").innerHTML = timeRemaining;
        if (timeRemaining == 0) { //game over
            stopCountdown();
            show("gameOver");
            document.getElementById("gameOver").innerHTML =
                "<p>Game Over!</p><p>Your Score is " + score + ".</p>";
            hide("timer");
            hide("correctAnswer");
            hide("wrongAnswer");
            playing = false;
            document.getElementById("startGame").innerHTML = "Start Game";
        }
    }, 1000);

}
//  start Countdown
function stopCountdown() {
    clearInterval(action);
}
// hide al element

function hide(Id) {
    document.getElementById(Id).style.display = "none";
}
// show an element

function show(Id) {
    document.getElementById(Id).style.display = "block";

}

// generate Question Answer

function generateQA() {

    var x = 1 + Math.round(9 * Math.random());
    var y = 1 + Math.round(9 * Math.random());
    correctAnswer = x * y;
    document.getElementById("question").innerHTML = x + " x " + y;

    var correctPosition = 1 +
        Math.round(3*Math.random());
    document.getElementById("box" + correctPosition).innerHTML = correctAnswer;

    // fill the boxes with wrong answers
    var answers = [correctAnswer];
    for (i = 1; i < 5; i++) {
        if (i != correctPosition) {
            var wrongAnswer;
            do {
                wrongAnswer =
                    (1 + Math.round(9 * Math.random())) *
                    (1 + Math.round(9 * Math.random())); //wrong answer
            } while (answers.indexOf(wrongAnswer) > -1)
            document.getElementById("box" + i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);


        }
    }

}