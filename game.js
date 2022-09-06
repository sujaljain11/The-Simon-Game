var buttoncolours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userclickedpattern = [];
var a = 0;
var level = 0;
var ns = 0;
$(document).keydown(function() {
  a++;
  if (a === 1) {
    nextSequence();
  }
});


$(".btn").click(function() {
  var userchosencolour = $(this).attr("id");
  userclickedpattern.push(userchosencolour);
  playsound(userchosencolour);
  animatepress(userchosencolour);
  checkanswer(userclickedpattern.length - 1);
})

function nextSequence() {
  userclickedpattern = [];
  ns++;
  $("#level-title").text("Level " + ns);
  var randomVariable = Math.floor(Math.random() * 4);
  var randomchosencolour = buttoncolours[randomVariable];
  gamePattern.push(randomchosencolour);
  $("#" + randomchosencolour).fadeIn(100).fadeOut(100).fadeIn(100);
  playsound(randomchosencolour);
}


function playsound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatepress(currentcolour) {
  $("#" + currentcolour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentcolour).removeClass("pressed")
  }, 100);
}


function checkanswer(currentlevel) {
  if (gamePattern[currentlevel] === userclickedpattern[currentlevel]) {
    if (gamePattern.length === userclickedpattern.length) {
      setTimeout(function() {
        nextSequence()
      }, 1000);
    }
  }
  else {
    playsound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over")},200);
    $("h1").text("Game Over, Press Any Key to Restart");
    a=0;
    level=0;
    ns=0;
    gamePattern=[];
  }
}
