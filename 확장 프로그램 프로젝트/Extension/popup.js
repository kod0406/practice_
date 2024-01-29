const audio = new Audio(chrome.runtime.getURL("Martini Blue.flac"));

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('startTimer').addEventListener('click', function () {
        startTimer();
    });
}); /* 이 html에서(popup.html에서)
       startTimer를 클릭했을때, startTimer()라는 함수를 실행하라 */

function startTimer() {
    stopAlarmSound();
    const timeInput = document.getElementById('timeInput');
    const timeInSeconds = parseInt(timeInput.value, 10);

    // Create alarms for the main timer and the additional set time
    createAlarm('mainTimer', timeInSeconds);
    const additionalTimeInSeconds = 10; // You can adjust this additional time
    createAlarm('additionalTimer', timeInSeconds + additionalTimeInSeconds);

    alert(`Timer set for ${timeInSeconds} seconds.`);
}

function createAlarm(alarmName, delayInSeconds) {
    chrome.alarms.create(alarmName, { delayInMinutes: delayInSeconds / 60 });
}

// Listen for alarms
chrome.alarms.onAlarm.addListener(function (alarm) {
    if (alarm.name === 'mainTimer') {
        handleTimerCompletion();
        audio.play();
    } else if (alarm.name === 'additionalTimer') {
        handleAdditionalTimerCompletion();
    }
});

function handleTimerCompletion() {
    // Notify the user that the main timer is complete
    chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon.png',
        title: 'Timer Complete',
        message: 'Your main timer is complete!',
    });
}

function handleAdditionalTimerCompletion() {
    // Notify the user that the additional timer is complete
    chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon.png',
        title: 'Additional Timer Complete',
        message: 'Your additional timer is complete!',
    });
}

function stopAlarmSound() {
    // Check if the audio is currently playing and stop it
    audio.pause();
    audio.currentTime = 0;
}


const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;
const COLOR_CODES = {
    info: {
        color: "green",
    },
    warning: {
        color: "orange",
        threshold: WARNING_THRESHOLD,
    },
    alert: {
        color: "red",
        threshold: ALERT_THRESHOLD,
    },
};



document.querySelector("#timer").innerHTML = `

   <div class="base-timer">
        <svg
          class="base-timer__svg"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/1000/svg"
        >
          <g class="base-timer__circle">
            <circle
              class="base-timer__path-elapsed"
              cx="50"
              cy="50"
              r="45"
            ></circle>
            <path
              id="base-timer-path-remaining"
              stroke-dasharray="283"
              class="base-timer__path-remaining ${remainingPathColor}"
              d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
            ></path>
          </g>
        </svg>
        <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
)}</span>
      </div>

`;

window.addEventListener("load", () => {
    const startBtn = document.getElementById("startTimer");
    const timeInput = document.getElementById("timeInput");
    //   console.log(startBtn, timeInput);
    timeInput.onchange = () => {
        TIME_LIMIT = timeInput.value;
        timeInput.value = "";
    };
    startBtn.onclick = () => {
        TIME_LIMIT === 0 ? alert("Add time") : startTimer2();
    };
});

function startTimer2() {
    console.log("value");

    // Reset variables and styles
    timePassed = 0;
    remainingPathColor = COLOR_CODES.info.color;
    document.getElementById("base-timer-path-remaining").classList.remove(COLOR_CODES.warning.color, COLOR_CODES.alert.color);
    document.getElementById("base-timer-path-remaining").classList.add(COLOR_CODES.info.color);

    timerInterval = setInterval(() => {
        timePassed = timePassed += 1;
        timeLeft = TIME_LIMIT - timePassed;
        document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft);

        setCircleDasharray();
        setRemainingPathColor(timeLeft);

        if (timeLeft === 0) {
            onTimesUp();
        }
    }, 1000);
}

function onTimesUp() {
    clearInterval(timerInterval);
    TIME_LIMIT = 0;
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (seconds < 10) {
        seconds = `0${seconds}
    `;
    }

    return ` ${minutes}:${seconds}`;
}
function setRemainingPathColor(timeLeft) {
    const { alert, warning, info } = COLOR_CODES;

    if (timeLeft <= alert.threshold) {
        document
            .getElementById("base-timer-path-remaining")
            .classList.remove(warning.color);
        document
            .getElementById("base-timer-path-remaining")
            .classList.add(alert.color);
    } else if (timeLeft <= warning.threshold) {
        document
            .getElementById("base-timer-path-remaining")
            .classList.remove(info.color);
        document
            .getElementById("base-timer-path-remaining")
            .classList.add(warning.color);
    }
}

function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}
function setCircleDasharray() {
    const circleDasharray = `${(
        calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;

    document
        .getElementById("base-timer-path-remaining")
        .setAttribute("stroke-dasharray", circleDasharray);
}

