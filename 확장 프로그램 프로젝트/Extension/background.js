chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.create({'url': chrome.extension.getURL('popup.html')}, function(tab) {
  });
});
//background.js는 
//1)확장 프로그램 아이콘을 누르면 새 탭에 popup.html이 열리게 하는 스크립트(상단),
//2) popup.js에서 메시지를 통해 받은 값만큼 이미지와 택스트를 바꾸는 changeimg.js에게 지속적으로 메시지를 보내는 역할을 수행하는 스크립트(하단)

let timeLeft = 0;
let timePassed = 0;
let left = 0;
let intervalId = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {//popup.js에서 보낸 메시지를 받기위한 크롬 API
  if (message.action === "logValue") { //정상적인 타이머가 시작되었을떄 background.js에서도 타이머 실행
    timeLeft = message.value;
    console.log("Get Value:", timeLeft);

    intervalId = setInterval(() => {
      timePassed = timePassed += 5;
      left = timeLeft - timePassed;

      if (left > 1) {
        console.log("Send request to change img.");
        console.log("timeLeft:", left);

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => { //background.js에서 이미지와 택스트를 바꾸는 changeimg.js로 메시지 전송
          const currentTabId = tabs[0].id;
          chrome.tabs.sendMessage(currentTabId, { action: "changeContent" });
        });
      } else if (left === 0) {//시간이 0이 되면 타이머 종료
        console.log("Interval stopped.");
        clearInterval(intervalId);
        timePassed = 0;
      }
    }, 5000);
  } else if (message.action === "Start") { // 재시작 버튼을 눌렀을떄 보낸 메시지를 받았을 때,타이머 재실행 + 타이머 진행도는 timePass를 초기화 하지 않음으로 저장
    console.log("recived Start");
    intervalId = setInterval(() => {
      timePassed = timePassed += 5;
      left = timeLeft - timePassed; 

      if (left > 1) {
        console.log("Send request to change img.");
        console.log("timeLeft:", left);

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          const currentTabId = tabs[0].id;
          chrome.tabs.sendMessage(currentTabId, { action: "changeContent" });
        });
      } else if (left === 0) {
        console.log("Interval stopped.");
        clearInterval(intervalId);
        timePassed = 0;
      }
    }, 5000);
  } else if (message.action === "Stop") {//일시정지 버튼을 눌렀을 때, 타이머 정지
    console.log("recived Stop");
    clearInterval(intervalId);
  }
  else if(message.action === "Input_Error") {
    console.log("Start Null Error");
    clearInterval(intervalId);
    timePassed = 0;
  }
});
//console.log()는 값을 정상적으로 전달받았는지 확인하기 위해 사용함.