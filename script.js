var game = {
  count: 0,
  colors: ["#green", "#pink", "#yellow", "#blue"],
  program: [],
  human: [],
  sounds: {
    green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
    pink: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
    blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
    yellow: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
  },
  strict: false,
}

function sounds(color) {
    switch (color) {
      case "#green":
        game.sounds.green.play();
        break;
      case "#pink":
        game.sounds.pink.play();
        break;
      case "#yellow":
        game.sounds.yellow.play();
        break;
      case "#blue":
        game.sounds.blue.play();
        break;
    }
  }

function animation(color) {
    $(color).addClass("animate");
    sounds(color);
    setTimeout(function() {
      $(color).removeClass("animate");
    }, 500)
  }

function checkStrictMode() {
    if ($("#strict").is(":checked")){
      game.strict = true;
    } else {
      game.strict = false;
    }
  }

$("#start").click(function() {
    checkStrictMode();
    reset();
    $("#count-num").html("--");
    generateRandomColor();
  });

function reset() {
    game.program = [];
    game.human = [];
    game.count = 0;
  }

function generateRandomColor() {
    game.count++;
    if (game.count < 10) {
      $("#count-num").html("0" + game.count);
    } else {
      $("#count-num").html(game.count);
    }
    game.program.push(game.colors[(Math.floor(Math.random() * 4))]);
    playSequence();
  }

function playSequence() {
    var i = 0;
    var seq = setInterval(function() {
      animation(game.program[i]);
      i++;
      if (i >= game.program.length) {
        clearInterval(seq);
      }
    }, 700)
    game.human = [];
  }

function addColorToPlayer(id) {
    var color = "#" + id;
    console.log(color);
    game.human.push(color);
    checkHumanMove(color);
  }

function checkHumanMove(color) {
    if (game.human[game.human.length - 1] !== game.program[game.human.length - 1]) {
      sounds(color);
      if (game.strict === true) {
        $("#result").text("You lost!");
        $("#reset-game").text("Play Again");
        $("#board, #start, #strict-label, #count-num").fadeOut("slow");
        $("#final-screen").fadeTo("slow",1);
      } else {
        setTimeout(function() {
            alert("Wrong move! Try again.");
          }, 500);
        setTimeout(function() {
            playSequence();
          }, 500);
      }
    } else {
      sounds(color);
      var checkCorrect = game.human.length === game.program.length;
      if (checkCorrect) {
        if (game.count === 20) {
          $("#result").text("You won!");
          $("#reset-game").text("Play Again");
          $("#board, #start, #strict-label, #count-num").fadeOut("slow");
          $("#final-screen").fadeTo("slow",1);
        } else {
          setTimeout(function() {
            generateRandomColor();
          }, 500)
        }
      }
    }
  }

$("#reset-game").click(function() {
    $("#message").fadeOut("slow");
    $("#board, #start, #strict-label, #count-num").fadeTo("slow",1);
    $("#strict").prop("checked", false);
    reset();
    $("#count-num").html("--");
  });
