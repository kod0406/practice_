let Time_Left = 0;
let Time_Passed = 0;

/*function startTimerHandler() {
    const timeInput = document.getElementById("timeInput");
    const inputValue = parseInt(timeInput.value, 10);

    // 이제 원하는 동작 수행
    console.log("Start Timer in changeimg.js with value:", inputValue);
}*/

// background.js logic
// b.js logic
let left;  // variable to store the value

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "setValue") {
        // Assign the value to the variable
        left = message.value;
        console.log("Value received in b.js:", left);
    }
});




/*
setInterval(() => {
    document.querySelectorAll('*').forEach((el) => {
        const checkBgImage = getComputedStyle(el).backgroundImage !== "none";
        const isImgElement = el.tagName.toLowerCase() === 'img';

        if (checkBgImage || isImgElement) {
            el.src = 'https://dszw1qtcnsa5e.cloudfront.net/community/20231117/16d04d31-01c1-43de-81b2-e6614491f797/image.jpg';
        }
    });
}, 1000);
*/
