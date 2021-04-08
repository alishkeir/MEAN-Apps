// ~ Setting up timer
let timerObj = {
  minutes: 0,
  seconds: 0,
  timerID: 0,
};

//~ Playing alarm sound
const alarm = () => {
  let amount = 3;
  let audio = new Audio("./Alarm Clock - Free Sound Effect.mp3");

  audio.play();
};

//~ Updating Values
const updateValue = (key, value) => {
  if (value < 0) {
    value = 0;
    console.log("Positive numbers only");
  }

  if (key == "seconds") {
    if (value < 10) {
      value = "0" + value;
    }
    if (value > 59) {
      value = 59;
    }
  }

  $("#" + key).html(value || 0);
  timerObj[key] = value;
};

// ~ Self-Calling Function
(function detectChanges(key) {
  let input = "#" + key + "-input";

  $(input).change(function () {
    updateValue(key, $(input).val());
  });

  $(input).keyup(function () {
    updateValue(key, $(input).val());
  });

  return arguments.callee;
})("minutes")("seconds");

// ~ Updating buttons (Enabling / Disabling)

function startTimer() {
  buttonManager(["start", false], ["pause", true], ["stop", true]);
  freezeInputs();

  timerObj.timerID = setInterval(function () {
    timerObj.seconds--;
    if (timerObj.seconds < 0) {
      if (timerObj.minutes == 0) {
        alarm();
        return stopTimer();
      }
      timerObj.seconds = 59;
      timerObj.minutes--;
    }
    updateValue("minutes", timerObj.minutes);
    updateValue("seconds", timerObj.seconds);
  }, 1000);
}

function stopTimer() {
  clearInterval(timerObj.timerID);
  buttonManager(["start", true], ["pause", false], ["stop", false]);
  unFreezeInputs();
  $("#minutes-input").val("");
  $("#seconds-input").val("");
  updateValue("minutes", $("#minutes-input").val());
  updateValue("seconds", $("#seconds-input").val());
}

function pauseTimer() {
  buttonManager(["start", true], ["pause", false], ["stop", true]);
  clearInterval(timerObj.timerID);
}

function buttonManager(...buttonsArray) {
  for (let i = 0; i < buttonsArray.length; i++) {
    let button = "#" + buttonsArray[i][0] + "-button";

    if (buttonsArray[i][1]) {
      $(button).removeAttr("disabled");
    } else {
      $(button).attr("disabled", "disabled");
    }
  }
}

function freezeInputs() {
  $("#minutes-input").attr("disabled", "disabled");
  $("#seconds-input").attr("disabled", "disabled");
}

function unFreezeInputs() {
  $("#seconds-input").removeAttr("disabled");
  $("#minutes-input").removeAttr("disabled");
}
