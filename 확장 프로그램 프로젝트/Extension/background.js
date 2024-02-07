chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.create({'url': chrome.extension.getURL('popup.html')}, function(tab) {
    // Tab opened.
  });
});
/*document.addEventListener('DOMContentLoaded', function () {
  const startTimerBtn = document.getElementById('startTimer');
  const timeInput = document.getElementById('timeInput');

  startTimerBtn.addEventListener('click', function () {
    const timeInSeconds = parseInt(timeInput.value, 10);

    if (!isNaN(timeInSeconds) && timeInSeconds > 0) {
      // Send a message to the content script to start the timer
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'startTimer', timeInSeconds: timeInSeconds });
      });
    }
  });
});*/

let timeLeft = 0;
let timePassed = 0;
let left = 0;
let intervalId = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "logValue") {
    timeLeft = message.value;
    console.log("Get Value:", timeLeft);

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
  } else if (message.action === "Start") {
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
  } else if (message.action === "Stop") {
    console.log("recived Stop");
    clearInterval(intervalId);
  }
});

/*function startTimer() {
  setInterval(() => {
    timePassed += 1;
    timeLeft = timeLeft - timePassed;
    if (timeLeft > 0) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentTabId = tabs[0].id;
        chrome.tabs.sendMessage(currentTabId, { action: "changeImage" });
      });
    }
  }, 1000);
}*/

/*chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "logValue") {
    // Send a message to b.js
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { action: "setValue", value: message.value });
    });
  }
});
*/