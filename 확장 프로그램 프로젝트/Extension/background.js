// Service worker 시작 이벤트
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

chrome.action.onClicked.addListener(function(tab) {
  chrome.tabs.create({'url': chrome.runtime.getURL('popup.html')}, function(tab) {
  });
});

// 탭이 닫힐 때 타이머 초기화
chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  console.log("Tab closed, clearing timer");
  clearInterval(intervalId);
  timeLeft = 0;
  timePassed = 0;
  left = 0;
  imgChangeAllowed = false;
});

// 확장 프로그램이 비활성화될 때 타이머 초기화
chrome.runtime.onSuspend.addListener(() => {
  console.log("Extension suspending, clearing timer");
  clearInterval(intervalId);
  timeLeft = 0;
  timePassed = 0;
  left = 0;
  imgChangeAllowed = false;
});

//background.js는
//1)확장 프로그램 아이콘을 누르면 새 탭에 popup.html이 열리게 하는 스크립트(상단),
//2) popup.js에서 메시지를 통해 받은 값만큼 이미지와 택스트를 바꾸는 changeimg.js에게 지속적으로 메시지를 보내는 역할을 수행하는 스크립트(하단)

let timeLeft = 0;
let timePassed = 0;
let left = 0;
let intervalId = null;
let imgChangeAllowed = false; // 이미지 변경 여부를 추적하는 변수

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "Img") {
    imgChangeAllowed = message.status; // true 또는 false로 설정
    console.log("Image change status updated:", imgChangeAllowed);
  }

  if (message.action === "logValue") {
    timeLeft = message.value;
    console.log("Get Value:", timeLeft);

    intervalId = setInterval(() => {
      timePassed += 5;
      left = timeLeft - timePassed;

      // 남은 시간은 항상 콘솔에 출력
      console.log("Time left:", left);

      if (left > 1) {
        if (imgChangeAllowed) { // 이미지 변경이 허용된 경우에만 이미지 변경 메시지 전송
          console.log("Send request to change img.");
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const currentTabId = tabs[0].id;
            chrome.tabs.sendMessage(currentTabId, { action: "changeContent" });
          });
        }
      } else if (left === 0) { // 타이머가 0에 도달하면 중지
        console.log("Interval stopped.");
        clearInterval(intervalId);
        timePassed = 0;
      }
    }, 5000);
  } else if (message.action === "Start") {
    console.log("Received Start");

    intervalId = setInterval(() => {
      timePassed += 5;
      left = timeLeft - timePassed;

      // 남은 시간은 항상 콘솔에 출력
      console.log("Time left:", left);

      if (left > 1) {
        if (imgChangeAllowed) { // 이미지 변경이 허용된 경우에만 이미지 변경 메시지 전송
          console.log("Send request to change img.");
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const currentTabId = tabs[0].id;
            chrome.tabs.sendMessage(currentTabId, { action: "changeContent" });
          });
        }
      } else if (left === 0) {
        console.log("Interval stopped.");
        clearInterval(intervalId);
        timePassed = 0;
      }
    }, 5000);
  } else if (message.action === "Stop") {
    console.log("Received Stop");
    clearInterval(intervalId);
  } else if (message.action === "Input_Error") {
    console.log("Start Null Error");
    clearInterval(intervalId);
    timePassed = 0;
  }
});

//console.log()는 값을 정상적으로 전달받았는지 확인하기 위해 사용함.