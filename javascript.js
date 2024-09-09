var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;

// If we click on the start/reset button
document.getElementById("startreset").onclick = function () {
    'use strict';  // Use strict inside this function as well

    // If we are playing
    if (playing === true) {
        location.reload(); // Reload page
    } else {
        // If we are not playing

        // Change mode to playing
        playing = true;

        // Set score to zero
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;

        // Show countdown box
        show("timeremaining");
        timeremaining = 60;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
		
		//hide game over box
		hide("gameOver");

        // Change button to reset
        document.getElementById("startreset").innerHTML = "Reset Game";

        // Start countdown
        startCountdown();
		
		//generate a new Q&A
		
		generateQA();
    }
};

//clicking on an answer box
for(i=1; i<5; i++){
	document.getElementById("box" +i).onclick = function(){
	//check if we are playing
	
	if(playing==true){
		if(this.innerHTML == correctAnswer){
		       //correct answer
			
			//increase score by 1
			score++;
			document.getElementById("scorevalue").innerHTML = score;
			
			//hide wrong box and show correct box
			
			hide("wrong");
			show("correct");
			setTimeout(function(){
				hide("correct");
			}, 1000);
			
			//generate new QA
			
			generateQA();
			
		   }
		else{
			//wronng answer
			hide("correct");
			show("wrong");
			setTimeout(function(){
				hide("wrong");
			}, 1000);
			
		}
	}
}
}

// Functions
//to start the countdown
function startCountdown() {
    'use strict';  // Use strict inside the function
    action = setInterval(function () {
		timeremaining -= 1;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
		if (timeremaining === 0) {//game over
			stopCountdown();
			
			show("gameOver");
			document.getElementById("gameOver").innerHTML = "<p>Game Over!</p><p>Your score is " + score + ".</p>";
			
			hide("timeremaining");
			hide("correct");
			hide("wrong");
			playing = false;
			document.getElementById("startreset").innerHTML = "Start Game";
			
		}
    }, 1000);
}

//stop counter
function stopCountdown() {
	'use strict';
	clearInterval(action);
}


//hide an element
function hide(Id) {
	'use strict';
	document.getElementById(Id).style.display = "none";
}

//show an element
function show(Id) {
	'use strict';
	document.getElementById(Id).style.display = "block";
}

// generate Q&A

function generateQA() {
	'user strict';
	var x = 1 + Math.round(9 * Math.random());
	var y = 1 + Math.round(9 * Math.random());
	correctAnswer = x * y;
	document.getElementById("question").innerHTML = x + "x" + y;
	var correctPosition = 1 + Math.round(3 * Math.random());
	document.getElementById("box" + correctPosition).innerHTML = correctAnswer; //fill one box with the correct answer.
	
	//fill other boxes with wrong answers 
	
	
	var answers = [correctAnswer];
	
	for (i = 1; i < 5; i++){
		
		if(i != correctPosition) {
			var wrongAnswer;
			do{
				wrongAnswer = (1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random())); 
			}
			while(answers.indexOf(wrongAnswer)>-1)
			
			
			document.getElementById("box" + i).innerHTML = wrongAnswer; 
			answers.push(wrongAnswer);
		}
	}
	
}
