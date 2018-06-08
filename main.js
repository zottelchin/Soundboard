document.querySelector("#testStart").addEventListener("click", playStartSound);
document.querySelector("#test5Min").addEventListener("click", play5minSound);
document.querySelector("#testStop").addEventListener("click", playStopSound);
document.querySelector("#startCD").addEventListener("click", startTimer);
document
  .querySelector("#countdowntime")
  .addEventListener("change", updatetimer);

var isrunning = false;

function playStartSound() {
  new Audio("https://www.soundjay.com/button/beep-01a.mp3").play();
}

function play5minSound() {
  new Audio("https://www.soundjay.com/button/beep-02.mp3").play();
}

function playStopSound() {
  new Audio("https://www.soundjay.com/button/beep-04.mp3").play();
}

function updatetimer() {
  if (!isrunning) {
    document.getElementById("clockdiv").querySelector(".remaining").innerHTML =
      ("0" + parseInt(document.querySelector("#countdowntime").value)).slice(
        -2
      ) + ":00";
  }
}

function startTimer() {
  isrunning = true;
  var i = parseInt(document.querySelector("#countdowntime").value);
  var deadline = new Date(Date.parse(new Date()) + i * 60 * 1000);
  initializeClock(deadline);
}

function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  return {
    total: t,
    minutes: minutes,
    seconds: seconds
  };
}

function initializeClock(endtime) {
  var resume = document.querySelector("#resumeCD");
  var pause = document.querySelector("#pauseCD");
  var clock = document.getElementById("clockdiv");
  var timeSpan = clock.querySelector(".remaining");
  var jtime = document.querySelector("#jingle2time");
  var paused = false;

  document.querySelector("#StopCD").addEventListener("click", resetTimer);
  pause.addEventListener("click", pauseTimer);
  pause.classList.remove("d-none");

  resume.addEventListener("click", resumeTimer);

  function resumeTimer() {
    paused = false;
    pause.classList.remove("d-none");
    resume.classList.add("d-none");
  }

  function pauseTimer() {
    paused = true;
    pause.classList.add("d-none");
    resume.classList.remove("d-none");
  }

  function resetTimer() {
    clearInterval(timeinterval);
    document.getElementById("clockdiv").querySelector(".remaining").innerHTML =("0" + parseInt(document.querySelector("#countdowntime").value)).slice(-2) + ":00";
      resume.classList.add("d-none");
      pause.classList.add("d-none");
  }

  function updateClock() {
    if (!paused) {
      var t = getTimeRemaining(endtime);
      timeSpan.innerHTML =
        ("0" + t.minutes).slice(-2) + ":" + ("0" + t.seconds).slice(-2);

    if (t.total == parseInt(jtime.value) * 60 * 1000){
        play5minSound();
    }

      if (t.total <= 0) {
        isrunning = false;
        playStopSound();
        resetTimer();
      }
    }else{
        endtime = new Date(Date.parse(endtime)+ 1000);
    }
  }

  updateClock();
  playStartSound();
  var timeinterval = setInterval(updateClock, 1000);
}

updatetimer();
