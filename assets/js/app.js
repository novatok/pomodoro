//Page loading function
function loadPage() {
    setTimeout(() => {
        document.getElementById("loader").style.display = "none";
        document.getElementById("mainContent").style.display = "block";
        workMode();
    }, 1000)
}

//Declare timer variables
var work = document.getElementById("work"),
shortBreak = document.getElementById("break"),
minsDisplay = document.getElementById("minutes"),
secsDisplay = document.getElementById("seconds"),
playBtn = document.getElementById("playBtn"),
pauseBtn = document.getElementById("pauseBtn"),
alarm = document.getElementById("alarm"),
workMinutes = 25,
breakMinutes = "0" + 5,
setCountDown,
seconds;


//Function to set initial timer values when pages loads or when mode is clicked
function setInitialTime(initMinutes) {
    minsDisplay.innerHTML = initMinutes;
    secsDisplay.innerHTML = "00";
}

// If workmode is clicked class="active" and set seconds
function workMode() {
    work.classList.add("active");
    shortBreak.classList.remove("active");
    seconds = 1500; //set to 1500
    setInitialTime(workMinutes);
    pauseTimer();
}

//If breakmode is clicked class="active" and set seconds
function breakMode() {
    shortBreak.classList.add("active");
    work.classList.remove("active");
    seconds = 300; //set to 300
    setInitialTime(breakMinutes);
    pauseTimer();
}

//Timer function to be called by set interval method when timer starts
function timer() {
    var minutes = Math.floor(seconds/60), 
    SecondsLeft = seconds % 60;

    if(SecondsLeft < 10) {
        SecondsLeft = "0" + SecondsLeft;
    }
    if(minutes < 10) {
        minutes = "0" + minutes;
    }

    minsDisplay.innerHTML = minutes;
    secsDisplay.innerHTML = SecondsLeft;

    if(seconds > 0) {
        seconds -= 1;
    }
    else {
        if(work.classList.contains("active")) {
            //Switch to break mode
            breakMode();
            //Alert user when timer ends
            playAlarm();
            setTimeout(pauseAlarm,8000);
        }
        else {
            //switch to work mode
            workMode();
            //Alert user when timer ends
            playAlarm();
            setTimeout(pauseAlarm,8000);
        }
    }
}

//when the user starts the timer
function startTimer() {
    //disable the active button
    playBtn.setAttribute("disabled", " ");
    pauseBtn.removeAttribute("disabled");
    pauseAlarm();

    setCountDown = setInterval(timer, 1000);
}

//When the user pauses the timer, disable pause btn, enable play btn, stop timer
function pauseTimer() {
    pauseBtn.setAttribute("disabled", " ");
    playBtn.removeAttribute("disabled");

    clearInterval(setCountDown);
}

//Reset timer to initial values; if in breakmode then 5 mins; if in workmode then 25 mins;
function resetTimer() {
    pauseTimer();
    return work.classList.contains("active") ? workMode() : breakMode();
}

//Start and stop timer sounds
function playAlarm() {
    alarm.play();
    alarm.loop = true;
}
function pauseAlarm() {
    alarm.pause();
}

/*Display contact and info sections when user clicks the respective icons */

function showContact() {
    document.getElementById("Contact").style.display = "block";
}

function showInfo() {
    document.getElementById("Info").style.display = "block";
}

// Close contact and info sections when button is clicked
function closeSection() {
    document.getElementById("Contact").style.display = "none";
    document.getElementById("Info").style.display = "none";
}

//Add animation for close button in contact & info sections
addEventListener("onmousemove", closeBTnAnimate );

function closeBTnAnimate() {
    document.getElementById("closeBtn").style.display = "block";
    document.getElementById("closeBtn2").style.display = "block";
}