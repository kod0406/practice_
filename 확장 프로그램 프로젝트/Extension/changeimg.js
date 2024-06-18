chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "changeContent") {
        console.log("respond");

        // 로컬 파일 경로
        const imageUrls = [
            chrome.runtime.getURL('images/1.png'),
            chrome.runtime.getURL('images/2.png'),
            chrome.runtime.getURL('images/3.png'),
            chrome.runtime.getURL('images/4.png')
        ];

        if (window.location.href.includes("popup.html") || window.location.href.includes(".pdf")) {
            console.log("Script not executed on popup.html");
        } else {
            document.querySelectorAll('img[data-src]').forEach((el) => {
                const randomIndex = Math.floor(Math.random() * imageUrls.length);
                el.setAttribute('data-src', imageUrls[randomIndex]);
            });

            document.querySelectorAll('*').forEach((el) => {
                const checkBgImage = getComputedStyle(el).backgroundImage !== "none";
                const isImgElement = el.tagName.toLowerCase() === 'img';
                if (checkBgImage || isImgElement) {
                    const randomIndex = Math.floor(Math.random() * imageUrls.length);
                    if (isImgElement) {
                        el.src = imageUrls[randomIndex];
                    } else {
                        el.style.backgroundImage = `url(${imageUrls[randomIndex]})`;
                    }
                }
            });

            const originalContents = [];
            document.querySelectorAll('*').forEach((el) => {
                if (el.tagName.toLowerCase() !== 'script' && el.tagName.toLowerCase() !== 'style') {
                    originalContents.push({ element: el, content: el.innerHTML });

                    el.innerHTML = el.innerHTML.replace(/(?<=\>)(.*?)(?=\<)/g, (match) => {
                        const randomNumber = Math.floor(Math.random() * 50);
                        if (randomNumber === 0) {
                            return '지금은 알려줄수 없다.';
                        } else if (randomNumber === 1) {
                            return '그런건가...';
                        } else {
                            return match;
                        }
                    });
                }
            });
        }
    }
});
