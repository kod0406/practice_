const audio = new Audio(chrome.runtime.getURL("Martini Blue.flac"));

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('startTimer').addEventListener('click', function () {
        startTimer();
    });
}); /* 이 html에서(popup.html에서)
       startTimer를 클릭했을때, startTimer()라는 함수를 실행하라 */

function startTimer() {
    stopAlarmSound();
    const timeInput = document.getElementById('timeInput'); //html의 timeInput에서 값을 읽어와 timeInput에 저장
    const timeInSeconds = parseInt(timeInput.value, 10); // 10진수의 정수로 값을 받겠다

    // Create alarms for the main timer and the additional set time
    createAlarm('mainTimer', timeInSeconds);
    const additionalTimeInSeconds = 10; // You can adjust this additional time
    createAlarm('additionalTimer', timeInSeconds + additionalTimeInSeconds); //기본 알람 10초후애 추가 알람 생성 로직

    alert(`Timer set for ${timeInSeconds} seconds.`);
}//버튼을 누르면 mainTimer와 additionalTimer값을 받아오면서 createAlarm()를 호출

function createAlarm(alarmName, delayInSeconds) {
    chrome.alarms.create(alarmName, { delayInMinutes: delayInSeconds / 60 }); // 초를 /60해서 분으로 만듬
}
/*팝업 알림은 chrome.alarms.create(alarmName, alarmInfo);로 구성되어 있으며, alarmInfo는 알람의 설정을 담당,

*/

// Listen for alarms
chrome.alarms.onAlarm.addListener(function (alarm) {
    if (alarm.name === 'mainTimer') {
        handleTimerCompletion();
        audio.play();
    } else if (alarm.name === 'additionalTimer') {
        handleAdditionalTimerCompletion();
    }
});//createAlarm()에서 만들어진 알람의 시간이 다 되면 이 코드가 실행됨 "onAlarm"이기에

function handleTimerCompletion() {
    //알람 양식
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

