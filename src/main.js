// Mobile Hamburger Menu
const menuClose = document.getElementById("close-menu");				// Store mobile menu close button
const menuOpen = document.getElementById("open-menu");					// Store mobile menu open button
const mobileMenu = document.getElementsByClassName("mobile-menu")[0];	// Store mobile menu

// When the user clicks the mobile menu open button, display the mobile menu and hide the menu open button
menuOpen.addEventListener("click", function() {
	mobileMenu.style.width = "100%";
	menuOpen.style.display = "none";
});

// When the user clicks the mobile menu close button, hide the mobile menu and display the menu open button
menuClose.addEventListener("click", function() {
	mobileMenu.style.width = "0";
	menuOpen.style.display = "block";
});



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
    	questionCounter++;	// Increment questionCounter for each question displayed
    	answerInputContainer.style.display = "block";		// Show answer input container
    	answerBox.value = "";								// Clear answer input box
    	answerDisplay.style.display = "none";				// Hide correct answer display container

    	apiResult.sort(function(a, b){return 0.5 - Math.random()});  // Sort returned array

    	question = apiResult.pop();	// Remove and store last question from array to prevent duplicates

    	questionContainer.innerText = question.question;	// Display question in question container
    }

    // Compare the user's answer to the correct answer
    function checkAnswer() {
    	const userAnswer = answerBox.value.trim().toLowerCase();	// Grab and store user answer
    	answerInputContainer.style.display = "none";				// Hide answer input container
    	answerDisplay.style.display = "block";						// Show correct answer display container

    	// Check user's answer against correct answer and increment or decrement the score
    	if (userAnswer == question.answer.trim().toLowerCase()) {
    		score = score + question.value;		// Add to user score

    		resultContainers[0].innerText = "Correct!";		// Display message that user was correct
    	} else {
    		score = score - question.value;		// Subtract from the user score

    		resultContainers[0].innerText = "Incorrect!";	// Display message that user was incorrect
    	}

    	resultContainers[1].innerText = `The correct answer is ${question.answer}.`;	// Display correct answer
    	resultContainers[2].innerText = `Your score is ${score}`;						// Display current user score
    }

    displayQuestion();		// Show first question

    // When user clicks check answer button, run checkAnswer function
    answerButton.addEventListener("click", checkAnswer);

    // When user clicks next question button, display the next question and check questionCounter
    nextQuestion.addEventListener("click", function() {
    	displayQuestion();		// Display next question

    	// If five questions have been displayed, end game
    	if (questionCounter >= 5) {
    		this.style.display = "none";	// Hide next question button

    		questionContainer.style.display = "none";		// Hide question container

    		// Display game over message and final score
    		resultContainers[0].innerText = "Game Over!";
    		resultContainers[1].innerText = "Your final score is:";
    		resultContainers[2].innerText = score;
    	}
    })
  }
};
xmlhttp.open('GET', 'http://jservice.io/api/clues?category=472', true);
xmlhttp.send();