var scoreContainer = document.querySelector("#quizContent");
var highScores = document.querySelector("#displayScores");
var backButton = document.querySelector("#back");
var emptyButton = document.querySelector("#empty");

// Back button will take the user back to the main page
backButton.addEventListener("click", function() {
    window.location.replace("index.html");
});
// The clear button will clear the high score leaderboard
emptyButton.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});
//created variable to hold storage for high score once the full name has been enter
var store = localStorage.getItem("storeScores");
store = JSON.parse(store);


if (store !== null) {
    for (var i = 0; i < store.length; i++) {
        var addScore = document.createElement("li");
        addScore.setAttribute("id", "scoreLi");
        addScore.textContent = store[i].initials + " " + store[i].score;

        highScores.appendChild(addScore);
    }
};