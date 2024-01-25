chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name === 'timerAlarm') {
    chrome.windows.create({
      type: 'popup',
      url: 'notification.html',
      width: 300,
      height: 150,
      top: 100,
      left: screen.width - 350
    });
  } else if (alarm.name === 'additionalAlarm') {
    alert('Additional time is up!');
  }
});
