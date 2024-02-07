const audio = new Audio(chrome.runtime.getURL("/Audio/Martini Blue.flac"));
const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 50;
const ALERT_THRESHOLD = 30;


const COLOR_CODES = {
    info: {
        color: "green",
    },
    warning: {
        color: "orange",
        get threshold(){
            return(WARNING_THRESHOLD / 100 ) * TIME_LIMIT;
        }
    },
    alert: {
        color: "red",
        get threshold(){
            return(ALERT_THRESHOLD / 100 ) * TIME_LIMIT;
        }
    },
};

let TIME_LIMIT = 0;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timevalue = 0;
let paused = false;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

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
    const pauseBtn = document.getElementById("PauseTimer");
    const resumeBtn = document.getElementById("ResumeTimer");
    const timeInput = document.getElementById("timeInput");
    /*chrome.alarms.create("TimerEnd", { delayInMinutes: parseInt(timeInput.value, 10) / 60 });
    alert(`Timer set for ${parseInt(timeInput.value, 10)} seconds.`);*/

   /* timeInput.onchange = () => {
        TIME_LIMIT = (parseInt(timeInput.value, 10) * 60); // Convert input value to an integer
        //timeInput.value = ""; tlqkf 이게 문제였네 시발 진짜
    };*/

    startBtn.onclick = () => {
        timePassed = 0;
        TIME_LIMIT = (parseInt(timeInput.value, 10) * 60);
        TIME_LIMIT === 0 ? alert("Add time") : startTimer();
        const inputValue = (timeInput.value * 60);
        console.log("Changing image with value:", inputValue);
        chrome.runtime.sendMessage({ action: "logValue", value: inputValue });
        SetAlarm();
        //alert(`Timer set for ${parseInt(timeInput.value, 10)} seconds.`); 확인용 알람
        stopAlarmSound();
        timeInput.value = "";
    };
    pauseBtn.onclick = () =>{
        PauseTimer();
    };
    resumeBtn.onclick = () =>{
        ResumeTimer();
    }

});


function startTimer() {

    // Reset variables and styles
    clearInterval(timerInterval);
    remainingPathColor = COLOR_CODES.info.color;
    document.getElementById("base-timer-path-remaining").classList.remove(COLOR_CODES.warning.color, COLOR_CODES.alert.color);
    document.getElementById("base-timer-path-remaining").classList.add(COLOR_CODES.info.color);


    timerInterval = setInterval(() => {// 주어진 기능을 일정한 간격으로 반복 실행하는 자바스크립트 함수 1000ms마다 실행
        timePassed = timePassed += 1; //interval 함수가 실행될 때마다 timePassed 변수를 1 증가
        timeLeft = TIME_LIMIT - timePassed; //남은 시간 계산
        timevalue = timeLeft;
        document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft);
        //"base-timer-label" ID를 가진 요소의 HTML 내용을 업데이트하여 포맷된 남은 시간을 표시 =>이거를 쓰면 되는거 아님?

        setCircleDasharray();
        setRemainingPathColor(timeLeft);

        if (timeLeft === 0) {
            onTimesUp();
            handleAlarm();
            audio.play();
        }
    }, 1000);
}

function PauseTimer() {
    if(!paused){
        clearInterval(timerInterval);
        chrome.runtime.sendMessage({ action: "Stop", value: paused });
        console.log("Send to Stop");
        paused = true;
        PauseAlarm();
    }
    else{
        PauseError();
    }
}
function ResumeTimer(){
    if(paused){
        chrome.runtime.sendMessage({ action: "Start", value: paused });
        console.log("Send to Resume");
        paused = false;
        ResumeAlarm();
        startTimer();
    }
    else{
        ResumeError();
    }
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

function stopAlarmSound() {
    audio.pause();
    audio.currentTime = 0;
}
//------------------ 현재시간 함수
var Target = document.getElementById("clock");

function clock() {
    var time = new Date();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();


    Target.innerText =
        `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}

function updateDate() {
    var currentDate = new Date();
    var day = currentDate.getDate();
    var monthIndex = currentDate.getMonth();
    var year = currentDate.getFullYear();

    var months = [
        "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
    ];

    var formattedDate = `${day < 10 ? '0' + day : day} ${months[monthIndex]} ${year}`;

    document.getElementById('date').innerText = formattedDate;
}
function updateTabTitle() {
    const time = new Date();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    document.title = `현재시각: ${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

    // Calculate the time left until the alarm starts (replace this with your actual alarm time)
    //const alarmTime = new Date(time.getFullYear(), time.getMonth(), time.getDate(), 12, 0, 0); // Set your alarm time here
    //let timeLeft2 = alarmTime.getTime() - time.getTime();//이게 문제임


    if (TIME_LIMIT > 0) {
/*        //timeLeft2 = Math.max(timeLeft, 0);//TimeLeft가 문제인듯 현재시간이 음수가 되는문재를 해결해야함
        const minutesLeft = parseInt(timeLeft / (1000 * 60), 10);
        const secondsLeft = parseInt((timeLeft % (1000 * 60)) / 1000, 10);
        const left = parseInt(timeLeft)

        //document.title = `Timer: ${minutesLeft}m ${secondsLeft}s`;
        document.title = left;*/
        const minutesLeft = Math.floor(timeLeft / 60);
        const secondsLeft = timeLeft % 60;
        document.title = `남은시간: ${minutesLeft < 10 ? `0${minutesLeft}` : minutesLeft}:${secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}`;
    } else {
        document.title = `현재시각: ${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    }
}

clock();
updateDate();
setInterval(updateTabTitle, 1000);
setInterval(clock, 1000);

//알람 양식
function handleAlarm() {//알람 양식 1
    //알람 양식
    chrome.notifications.create({
        type: 'basic',
        iconUrl: '/Pic/12.png',
        title: '타이머 종료',
        message: '설정한 시간이 다 되었습니다.',
    });
}

function SetAlarm() {// 알람 양식 2
    //알람 양식
    chrome.notifications.create({
        type: 'basic',
        iconUrl: '/Pic/22.png',
        title: '타이머 설정',
        message: '시간을 설정하였습니다.....',
    });
}

function PauseAlarm() {// 알람 양식 3
    //알람 양식
    chrome.notifications.create({
        type: 'basic',
        iconUrl: '/Pic/22.png',
        title: '타이머 일시정지',
        message: '타이머를 일시정지 했습니다.....',
    });
}

function ResumeAlarm() {// 알람 양식 4
    //알람 양식
    chrome.notifications.create({
        type: 'basic',
        iconUrl: '/Pic/22.png',
        title: '타이머 재개',
        message: '타이머를 재개했습니다.....',
    });
}

function ResumeError(){ // 알람 양식 5
    chrome.notifications.create({
        type: 'basic',
        iconUrl: '/Pic/12.png',
        title: '타이머 문제',
        message: '타이머가 이미 실행되고 있습니다.',
    });
}

function PauseError(){ // 알람 양식 6
    chrome.notifications.create({
        type: 'basic',
        iconUrl: '/Pic/12.png',
        title: '타이머 문제',
        message: '타이머가 이미 정지되어 있습니다.',
    });
}