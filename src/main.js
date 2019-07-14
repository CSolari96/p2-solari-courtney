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
const questionContainer = document.getElementById("question");
const answerInputContainer = document.getElementById("answer-input");
const answerDisplay = document.getElementById("answer-display");
const answerBox = document.querySelector("#quiz input");
const answerButton = document.querySelector("#quiz button");
const nextQuestion = document.querySelector("#answer-display button");
let score = 0;
let questionCounter = 0;

// jService API Request for questions from the agriculture category
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var apiResult = JSON.parse(this.responseText);
   
    // Set empty question and answer string variables to be set later
    let question = "";

    // Display a random question
    function displayQuestion() {
    	questionCounter++;
    	answerInputContainer.style.display = "block";
    	answerBox.value = "";
    	answerDisplay.style.display = "none";

    	apiResult.sort(function(a, b){return 0.5 - Math.random()});  // Sort returned array

    	question = apiResult[0];	// Select first question in array

    	questionContainer.innerText = question.question;	// Display question in question container
    }

    // Compare the user's answer to the correct answer
    function checkAnswer() {
    	const userAnswer = answerBox.value.trim().toLowerCase();	// Grab and store user answer
    	answerInputContainer.style.display = "none";
    	answerDisplay.style.display = "block";

    	const resultContainers = document.querySelectorAll("#answer-display p");

    	// If the user's answer is correct, increment the score otherwise decrement the score
    	if (userAnswer == question.answer.trim().toLowerCase()) {
    		score = score + question.value;

    		resultContainers[0].innerText = "Correct!";
    	} else {
    		score = score - question.value;

    		resultContainers[0].innerText = "Incorrect!";
    	}

    	resultContainers[1].innerText = `The correct answer is ${question.answer}.`;
    	resultContainers[2].innerText = `Your score is ${score}`;
    }


    answerButton.addEventListener("click", checkAnswer);
    nextQuestion.addEventListener("click", function() {
    	displayQuestion();

    	if (questionCounter >= 5) {
    		this.style.display = "none";

    	}
    })

    displayQuestion();

    

  }
};
xmlhttp.open('GET', 'http://jservice.io/api/clues?category=472', true);
xmlhttp.send();