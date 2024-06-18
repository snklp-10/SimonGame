var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var score = 0;
var lastScore = score;

function nextSequence() {
  userClickedPattern = [];
  level += 1;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
}

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

$(document).on("keypress", () => {
  if (started === false) {
    nextSequence();
    $("h1").text("Level " + level);
    started = true;
  }
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      lastScore += 50;
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    GameOver();
  }
}

function GameOver() {
  console.log("wrong");
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 200);
  $("h1").text("Game Over, Press Any Key to Restart");
  $("#score").text(score);
  startOver();
  trackScore();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

function trackScore() {
  if (lastScore > score) {
    score = lastScore;
    $("#score").text(score);
  }
  lastScore = 0;
}
