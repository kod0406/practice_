chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.create({'url': chrome.extension.getURL('popup.html')}, function(tab) {
    // Tab opened.
  });
});
document.addEventListener('DOMContentLoaded', function () {
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
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "logValue") {
    // Send a message to b.js
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { action: "setValue", value: message.value });
    });
  }
});