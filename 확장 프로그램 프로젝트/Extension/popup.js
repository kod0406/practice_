document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('startTimer').addEventListener('click', function () {
        startTimer();
    });
}); /* 이 html에서(popup.html에서)
       startTimer를 클릭했을때, startTimer()라는 함수를 실행하라 */

function startTimer() {
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
