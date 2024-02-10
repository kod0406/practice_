//popup.js는 popup.html에서 타이머와 시간을 표시해주는 기능과, 받은 시간을 background.js에게 보내는 역할을 수행하는 스크립트.
const audio = new Audio(chrome.runtime.getURL("/Audio/Martini Blue.flac"));
const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 50;
const ALERT_THRESHOLD = 30;


const COLOR_CODES = {//입력값을 통해 유동적으로 남은시간별 타이머 색상을 설정하는 타이머
    info: {
        color: "green",
    },
    warning: {
        color: "orange",
        get threshold(){
            return(WARNING_THRESHOLD / 100 ) * TIME_LIMIT; //총 입력시간의 50%가 남았을때
        }
    },
    alert: {
        color: "red",
        get threshold(){
            return(ALERT_THRESHOLD / 100 ) * TIME_LIMIT; //총 입력시간의 30%가 남았을때
        }
    },
};

let TIME_LIMIT = 0;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timevalue = 0;
let paused = false;
let TimerAgent = false;
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
// 타이머를 시각적으로 생성하고, 자바스크립트에서 호출되는 formatTime 함수를 통해 시간을 설정하여 텍스트로 표시

window.addEventListener("load", () => {//Html의 값을 읽어오는 역할
    const startBtn = document.getElementById("startTimer");
    const pauseBtn = document.getElementById("PauseTimer");
    const resumeBtn = document.getElementById("ResumeTimer");
    const timeInput = document.getElementById("timeInput");
    /*chrome.alarms.create("TimerEnd", { delayInMinutes: parseInt(timeInput.value, 10) / 60 }); // 크롬 자체 API로 알람을 만드는 기능
    alert(`Timer set for ${parseInt(timeInput.value, 10)} seconds.`); 디버깅용 알람 */
    startBtn.onclick = () => { //startBtn을 누르면
        timePassed = 0;
        TIME_LIMIT = (parseInt(timeInput.value, 10) * 60);
        if (isNaN(TIME_LIMIT) || TIME_LIMIT <= 0) {
            if(TimerAgent == true){
                timeInput.value = "";
                StopTimer();
                chrome.runtime.sendMessage({ action: "Input_Error", value: Error });// 타이머 관련 값을 background.js로 전송
                TimerAgent = false;//타이머를 실행했는가를 체크하는 변수
                return;
            }
            else{
                Notvalid();
                timeInput.value = "";
                chrome.runtime.sendMessage({ action: "Input_Error", value: Error });
                return;
            }
        }
        else {
            TimerAgent = true;
            startTimer();
            const inputValue = (timeInput.value * 60);
            console.log("Changing image with value:", inputValue);
            chrome.runtime.sendMessage({action: "logValue", value: inputValue});
            SetAlarm();
            //alert(`Timer set for ${parseInt(timeInput.value, 10)} seconds.`); 디버깅용 확인 알람
            stopAlarmSound();
            timeInput.value = "";
        }
    };
    pauseBtn.onclick = () =>{
    if(timePassed != 0) {
        PauseTimer();
    }
    else{
    TimerError();
    return;
    }
    };
    resumeBtn.onclick = () =>{
        if(timePassed != 0 ) {
            ResumeTimer();
        }
        else{
            TimerError();
            return;
        }
    }

});


function startTimer() {//타이머를 시작하는 함수.
    clearInterval(timerInterval);
    remainingPathColor = COLOR_CODES.info.color;
    document.getElementById("base-timer-path-remaining").classList.remove(COLOR_CODES.warning.color, COLOR_CODES.alert.color);
    document.getElementById("base-timer-path-remaining").classList.add(COLOR_CODES.info.color);


    timerInterval = setInterval(() => {// 주어진 기능을 일정한 간격으로 반복 실행하는 자바스크립트 함수 1000ms마다 실행
        timePassed = timePassed += 1; //interval 함수가 실행될 때마다 timePassed 변수를 1 증가
        timeLeft = TIME_LIMIT - timePassed; //남은 시간 계산
        timevalue = timeLeft;
        document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft);
        //"base-timer-label" ID를 가진 요소의 HTML 내용을 업데이트하여 포맷된 남은 시간을 표시

        setCircleDasharray();
        setRemainingPathColor(timeLeft);

        if (timeLeft === 0) {
            onTimesUp();
            handleAlarm();
            audio.play();
        }
    }, 1000);
}

function PauseTimer() {//타이머를 일시정지 하는 함수,타이머 진행도는 timePass를 초기화 하지 않음으로 저장
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
function ResumeTimer(){ //타이머를 재개하는 함수
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

function onTimesUp() {//타이머가 종료됐을떄 값 초기화
    clearInterval(timerInterval);
    TIME_LIMIT = 0;
}

function formatTime(time) {//Html에 타이머 표시해주는 함수
    if(!isNaN(time) && time > 0) {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;

        if (seconds < 10) {
            seconds = `0${seconds}
    `;
        }

        return ` ${minutes}:${seconds}`;
    }
    else{//음수나 NaN(숫자가 아님)이 들어올 경우,
        console.log("Start Btn Re-enter");
        clearInterval(timerInterval);
        return `0:00`;
    }
}
function setRemainingPathColor(timeLeft) {//시간별로 타이머의 색을 조절하는 함수
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
//console.log()는 값을 정상적으로 전달받았는지 확인하기 위해 사용함.

//현재시간, Html상단의 Title을 현재 시간으로 표시해주는 코드
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
    
    if (TIME_LIMIT > 0) {
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

function Notvalid() {// 알람 양식 0
    //알람 양식
    chrome.notifications.create({
        type: 'basic',
        iconUrl: '/Pic/43.png',
        title: '잘못된 숫자타입',
        message: '올바른 값을 입력해주세요.',
    });
}
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
        iconUrl: '/Pic/11.png',
        title: '타이머 일시정지',
        message: '타이머를 일시정지 했습니다.....',
    });
}

function ResumeAlarm() {// 알람 양식 4
    //알람 양식
    chrome.notifications.create({
        type: 'basic',
        iconUrl: '/Pic/50.png',
        title: '타이머 재개',
        message: '타이머를 재개했습니다.....',
    });
}

function ResumeError(){ // 알람 양식 5
    chrome.notifications.create({
        type: 'basic',
        iconUrl: '/Pic/48.png',
        title: '타이머 문제',
        message: '타이머가 이미 실행되고 있습니다.....',
    });
}

function PauseError(){ // 알람 양식 6
    chrome.notifications.create({
        type: 'basic',
        iconUrl: '/Pic/49.png',
        title: '타이머 문제',
        message: '타이머가 이미 정지되어 있습니다.....',
    });
}

function TimerError(){ // 알람 양식 7
    chrome.notifications.create({
        type: 'basic',
        iconUrl: '/Pic/26.png',
        title: '타이머 문제',
        message: '타이머를 시작하지 않았습니다.....',
    });
}

function StopTimer(){ // 알람 양식 8
    chrome.notifications.create({
        type: 'basic',
        iconUrl: '/Pic/34.png',
        title: '타이머 정지',
        message: '타이머를 정지했습니다.....',
    });
}