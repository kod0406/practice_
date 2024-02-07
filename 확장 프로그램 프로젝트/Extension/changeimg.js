
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "changeContent") {
        console.log("respond");

        // Define array of image URLs
        const imageUrls = [
            'https://postfiles.pstatic.net/MjAyNDAyMDZfMTY0/MDAxNzA3MjAzMTYyNTY2.IubBhjC9GrSn7uFdLZ1bH6lte_n_kQlmsqhk0yUAbPwg.6tt12GaZytin9XSRO66YiLsQAbrobwMbcG1xTJCQzOog.PNG.kod0406/1.png?type=w773',
            'https://postfiles.pstatic.net/MjAyNDAyMDZfOTUg/MDAxNzA3MjAzMTYyNDgy.ZmiomMsSkl3entRNTpVIsKdvF6BOktBliEmjc5Ap9Zgg.fL7ZJ5hQ2nW37NCik89cQr_LZibDZxecClpvBpKLwq8g.PNG.kod0406/4.png?type=w773',
            'https://postfiles.pstatic.net/MjAyNDAyMDZfMTM2/MDAxNzA3MjAzMTYyNTc3.d_SKGZrgPux5owyjvDgFbcFsPrqIZP9W8WO1o73WN3Mg.39eo_MeCdjViKVJma-tKHuLdOv_B6Aw-_X4dUlN-mgAg.PNG.kod0406/3.png?type=w773',
            'https://postfiles.pstatic.net/MjAyNDAyMDZfMjUz/MDAxNzA3MjAzMTYyNTky.bbJv_hNE0B1pSwuYO3TGGLJKA4_pH177OXMiOySKPxwg.IUtLU2_rLAUPMEe2_BNL6HzfAV2olGUg1hQweB1X94Ig.PNG.kod0406/2.png?type=w773'
        ];//위 2개 이미지 문제

        // Change image
        if (window.location.href.includes("popup.html")) {
            // If it's popup.html, you might want to avoid executing the content script
            console.log("Script not executed on popup.html");
        } else {
            // Continue with your existing logic to change images on other pages
            document.querySelectorAll('img[data-src]').forEach((el) => {
                // Handle lazy-loaded images
                const randomIndex = Math.floor(Math.random() * imageUrls.length);
                el.setAttribute('data-src', imageUrls[randomIndex]);
            });

            document.querySelectorAll('*').forEach((el) => {
                const checkBgImage = getComputedStyle(el).backgroundImage !== "none";
                const isImgElement = el.tagName.toLowerCase() === 'img';

                if (checkBgImage || isImgElement) {
                    // For non-lazy-loaded images
                    const randomIndex = Math.floor(Math.random() * imageUrls.length);
                    el.src = imageUrls[randomIndex];
                }
            });




            const originalContents = [];

// Iterate over all elements in the DOM
            document.querySelectorAll('*').forEach((el) => {
                // Check if the element is not a script or style tag
                if (el.tagName.toLowerCase() !== 'script' && el.tagName.toLowerCase() !== 'style') {
                    // Store the original content of the element
                    originalContents.push({ element: el, content: el.innerHTML });

                    // Replace innerHTML based on your logic
                    el.innerHTML = el.innerHTML.replace(/(?<=\>)(.*?)(?=\<)/g, (match) => {
                        // Generate a random number (0 to 9)
                        const randomNumber = Math.floor(Math.random() * 10);

                        // Check if the random number is 0 or 1
                        if (randomNumber === 0) {
                            // If randomNumber is 0, return a specific replacement
                            return '지금은 알려줄수 없다.';
                        } else if (randomNumber === 1) {
                            // If randomNumber is 1, return another specific replacement
                            return '그런건가...';
                        } else {
                            // If randomNumber is neither 0 nor 1, return the original content
                            return match;
                        }
                    });
                }
            });
        }
    }
});


