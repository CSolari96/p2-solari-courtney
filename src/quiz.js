// Are You Smarter than an Ag Teacher Quiz
const questionContainer = document.getElementById("question");				// Store question container
const answerInputContainer = document.getElementById("answer-input");		// Store answer input container
const answerDisplay = document.getElementById("answer-display");			// Store correct answer display
const answerBox = document.querySelector("#quiz input");					// Store answer input box
const answerButton = document.querySelector("#quiz button");				// Store check answer button
const resultContainers = document.querySelectorAll("#answer-display p");	// Access empty p elements for displaying result info
const nextQuestion = document.querySelector("#answer-display button");		// Store next question button

let score = 0;				// Store user score
let questionCounter = 0;	// Store number of questions user has answered

// jService API Request for questions from the agriculture category
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var apiResult = JSON.parse(this.responseText);
   
    // Set empty question and answer string variables to be set later
    let question = "";

    // Display a random question
    function displayQuestion() {
    	answerInputContainer.style.display = "block";		// Show answer input container
    	answerBox.value = "";								// Clear answer input box
    	answerDisplay.style.display = "none";				// Hide correct answer display container

    	apiResult.sort(function(a, b){return 0.5 - Math.random()});  // Sort returned array

    	question = apiResult[0];	// Remove and store last question from array to prevent duplicates

    	questionContainer.innerText = question.question;	// Display question in question container

    	questionCounter++;	// Increment questionCounter for each question displayed
    }

    // Compare the user's answer to the correct answer
    function checkAnswer() {
    	const userAnswer = answerBox.value.toLowerCase().trim();	// Grab and store user answer
    	answerInputContainer.style.display = "none";				// Hide answer input container
    	answerDisplay.style.display = "block";						// Show correct answer display container

    	// Check user's answer against correct answer and increment or decrement the score
    	// See if correct answer includes user answer to account for minor differences
        if (question.answer.toLowerCase().trim().includes(userAnswer)) {
    		score = score + question.value;		// Add to user score

    		resultContainers[0].innerText = "Correct!";		// Display message that user was correct
    	} else {
    		score = score - question.value;		// Subtract from the user score

    		resultContainers[0].innerText = "Incorrect!";	// Display message that user was incorrect
    	}

    	resultContainers[1].innerText = `The correct answer is ${question.answer}.`;	// Display correct answer
    	resultContainers[2].innerText = `Your score is ${score}`;						// Display current user score

    	isGameOver();		// Check to see if game is over		
    }

    // Check to see if 5 questions have been shown to end game
    function isGameOver() {
    	// If five questions have been displayed, end game
    	if (questionCounter >= 5) {
    		nextQuestion.style.display = "none";	// Hide next question button

    		// Wait 5 seconds, then display game over message
    		setTimeout(function() {
    			questionContainer.style.display = "none";		// Hide question container

	    		// Display game over message and final score
	    		resultContainers[0].innerText = "Game Over!";
	    		resultContainers[1].innerText = `Your final score is ${score}`;
	    		resultContainers[2].innerText = "";
    		}, 5000);
    	}
    }

    displayQuestion();		// Show first question

    // When user clicks check answer button, run checkAnswer function
    answerButton.addEventListener("click", checkAnswer);

    // When user clicks next question button, display the next question
    nextQuestion.addEventListener("click", displayQuestion);
  }
};
xmlhttp.open('GET', 'http://jservice.io/api/clues?category=472', true);
xmlhttp.send();


// Show donate menu 3 seconds after page loads
setTimeout(showDonateMenu, 3000);