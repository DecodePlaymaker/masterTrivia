var score= 0;
var holder = document.querySelector("#holder");
var quizContent = document.querySelector("#quizContent");
var questionTitle = document.querySelector("#qTitle");
var timer = document.querySelector("#timer");
var start = document.querySelector("#start");

// Created a Variable called question to hold my triva questions
var questions = [
    {
        title: " What makes up a form structure?",
        choices:["A div element with form elements inside", "A form element with input elements and a submit button inside", "A input and paragrpahs", "Whatever you want"],
        answer:"A form element with input elements and a submit button inside"
    },
    {
        title: " What does the p element do to the text it surrounds?",
        choices:["It breaks the text apart into a seperate paragraph", "It makes the text bold", "marks text that has stress emphasis", "used to draw the reader attention"],
        answer:"It breaks the text apart into a seperate paragraph"
    },
    {
        title: " CSS stand for?",
        choices:["Computer Style System", "Canvas Styling System", "Cascading Style Sheets", "Creative System Service "],
        answer:"Cascading Style Sheets"
    },
    {
        title: "Which property do you need to change the background color?",
        choices:["bgcolor", "color", "colorbg", "background-color"],
        answer:"background-color"
    },
    {
        title: "What's a good use for the values true and false?",
        choices:["Storing values from one to five", "Showing if a feature is switched on or of", "For empty or unknown values", "For collections or complex values"],
        answer:"Showing if a feature is switched on or of"
    },
    {
        title: "When can we use console.log() to display the value of a variable?",
        choices:["After we create the variable", "Before we create the variable", "Before or after we create the variable", "We create in CSS"],
        answer:"After we create the variable"
    },
];

// Function to start the game for the quiz
var questionIndex = 0;
var createUl = document.createElement("ul");
createUl.setAttribute("id", "optionsUl")

var timeInterval = 0;
var countdown = 60;
var penalty = 0;

start.addEventListener("click", function() {
    if (timeInterval === 0) {
        timeInterval = setInterval(function() {
            countdown--;
            timer.textContent = "Time: " + countdown;
            if (countdown <= 0) {
                clearInterval(timeInterval);
                theEnd();
            }
        }, 1000);
    }
    newQuestion(questionIndex)
});

// generates the next question after answering correctly 
function newQuestion(questionIndex) {
    quizContent.innerHTML = "";
    createUl.innerHTML = "";
    var displayQuestion = document.createElement("h2");

    for (var i = 0; i < questions.length; i++) {
        displayQuestion.innerHTML = questions[questionIndex].title;
        var displayChoices = questions[questionIndex].choices;
        quizContent.appendChild(displayQuestion);
    }
    console.log(displayChoices);
    displayChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.innerHTML += "<button>" + newItem + "</button>";
        quizContent.appendChild(createUl);
        createUl.appendChild(listItem);
        listItem.addEventListener("click", (checkAns));
    })
}

var i = 0;
var newDiv = document.createElement("div");
var comment = document.createElement("h3");
newDiv.setAttribute("id", "newDiv");
// inserts feedback (correct or incorrect) and verifies that the answer is accurate
function checkAns(event) {
        var choice = event.target;
        quizContent.appendChild(newDiv);
        newDiv.appendChild(comment);
        var next = document.createElement("button");
        next.setAttribute("id", "nextButton");
        next.textContent = "Next Question";

// condition that selected answer is correct
    if (choice.textContent == questions[questionIndex].answer) {
        score++;
        comment.textContent = "Correct!";
        newDiv.appendChild(comment);
        
        newDiv.appendChild(next);
        next.addEventListener("click", (movingOn));
//condition that the selected answer is incorrect
    } else {
        countdown = countdown - penalty;
        comment.textContent = "Incorrect!";
        newDiv.appendChild(comment);
    }
}
// Chooses wheter to start the last page or go on the next question
function movingOn(event) {
    newDiv.innerHTML = "";
    questionIndex++;
    if (questionIndex >= questions.length) {
        theEnd();
    } else {
        newQuestion(questionIndex);

    }
}

function theEnd() {
    quizContent.innerHTML = "";
    timer.innerHTML = "";
// Sets up high score page
    var newH1 = document.createElement("h1");
    newH1.setAttribute("id", "newH1");
    newH1.textContent = "Finished!"
    quizContent.appendChild(newH1);


// Compiling and presenting the final score
    if (countdown >= 0) {
        score = countdown;
        clearInterval(timeInterval);
        var newP = document.createElement("p");
        newP.textContent = "Your final score is: " + score;
        quizContent.appendChild(newP);
    } else {
        score = 0;
        var outOfTime = document.createElement("h2");
        outOfTime.textContent = "Time is up! 🕔";
        quizContent.appendChild(outOfTime);
        var newP = document.createElement("p");
        newP.textContent = "Your final score is: " + score;
        quizContent.appendChild(newP);
    }

// Initials on the button and submission box
    var initialsPrompt = document.createElement("label");
    initialsPrompt.setAttribute("for", "inputBox");
    initialsPrompt.textContent = "Enter Full Name: ";
    quizContent.appendChild(initialsPrompt);

    var inputBox = document.createElement("input");
    inputBox.setAttribute("type", "text");
    inputBox.setAttribute("id", "inputBox")  
    inputBox.textContent = "";
    quizContent.appendChild(inputBox)
    
    var submit = document.createElement("button");
    submit.setAttribute("type", "submit");
    submit.setAttribute("id", "submit");
    submit.textContent = "Submit";
    quizContent.appendChild(submit);

// Vent listener for score storage, initals and submission button
    submit.addEventListener("click", function() {
        var initials = inputBox.value;

        if (initials === "") {
            console.log("No Full Name entered")
            window.alert("Please enter Full Name");

        } else {
            var finalScore = {
                initials: initials,
                score: score
            }
    // Storage of past scores
            var store = localStorage.getItem("storeScores");
            if (store === null) {
                store = [];
            } else {
                store = JSON.parse(store);
            }
            store.push(finalScore);
            var newScore = JSON.stringify(store);
            localStorage.setItem("storeScores", newScore);
            window.location.replace("highscores.html");
        }
    });
};
