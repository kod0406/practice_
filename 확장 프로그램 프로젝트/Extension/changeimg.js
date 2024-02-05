/*let Time_Left = 0;
let Time_Passed = 0;

/!*function startTimerHandler() {
    const timeInput = document.getElementById("timeInput");
    const inputValue = parseInt(timeInput.value, 10);

    // 이제 원하는 동작 수행
    console.log("Start Timer in changeimg.js with value:", inputValue);
}*!/

// background.js logic
// b.js logic
let left;  // variable to store the value

let timeInterval;*/
// Listen for messages from the background script
/*
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "setValue") {
        left = message.value;
        console.log("Value received in popup.js:", left);

        // Reset Time_Passed and Time_Left
        Time_Passed = 0;
        Time_Left = left;

        timeInterval = setInterval(() => {
            Time_Passed = Time_Passed += 1;
            Time_Left = left - Time_Passed;
            console.log("Time Left in:", Time_Left);
            document.querySelectorAll('*').forEach((el) => {
                const checkBgImage = getComputedStyle(el).backgroundImage !== "none";
                const isImgElement = el.tagName.toLowerCase() === 'img';
                if (checkBgImage || isImgElement) {
                    el.src = 'https://dszw1qtcnsa5e.cloudfront.net/community/20231117/16d04d31-01c1-43de-81b2-e6614491f797/image.jpg';
                }
            });
            if (Time_Left === 0) {
                clearInterval(timeInterval);
                Time_Left = 0;
                console.log("Time gone Zero");
            }
        }, 1000);
    }
});
*/

/*chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "changeImage") {
        console.log("respond of Change img");
        document.querySelectorAll('*').forEach((el) => {
            const checkBgImage = getComputedStyle(el).backgroundImage !== "none";
            const isImgElement = el.tagName.toLowerCase() === 'img';

            if (checkBgImage || isImgElement) {
                el.src = 'https://dszw1qtcnsa5e.cloudfront.net/community/20231117/16d04d31-01c1-43de-81b2-e6614491f797/image.jpg';
                //el.src = chrome.extension.getURL('Pic/12.png');
            }
        });
    }
});*/


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "changeContent") {
        // Change text
        document.querySelectorAll('*').forEach((el) => {
            if (el.nodeType === Node.TEXT_NODE) {
                el.nodeValue = "Hello, World!";
            }
        });

        // Change image
        document.querySelectorAll('*').forEach((el) => {
            const checkBgImage = getComputedStyle(el).backgroundImage !== "none";
            const isImgElement = el.tagName.toLowerCase() === 'img';

            if (checkBgImage || isImgElement) {
                el.src = 'https://dszw1qtcnsa5e.cloudfront.net/community/20231117/16d04d31-01c1-43de-81b2-e6614491f797/image.jpg';
            }
        });
    }
});


/*
let left = 10;
let Time_Passed = 0;
let Time_Left = left;

const timeInterval = setInterval(() => {
    Time_Passed += 1;
    Time_Left = left - Time_Passed;
    console.log("Time Left in:", Time_Left);

    document.querySelectorAll('*').forEach((el) => {
        const checkBgImage = getComputedStyle(el).backgroundImage !== "none";
        const isImgElement = el.tagName.toLowerCase() === 'img';

        if (checkBgImage || isImgElement) {
            // Check if Time_Left is greater than 0 before changing the image
            if (Time_Left > 0) {
                el.src = 'https://dszw1qtcnsa5e.cloudfront.net/community/20231117/16d04d31-01c1-43de-81b2-e6614491f797/image.jpg';
            }
        }
    });

    if (Time_Left <= 0) {
        clearInterval(timeInterval);
        Time_Left = 0;
        console.log("Time gone Zero");
    }
}, 1000);*/
