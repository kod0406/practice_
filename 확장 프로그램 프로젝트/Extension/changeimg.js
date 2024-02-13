//background.js에서 메시지를 받을때마다 이미지와 택스트를 바꾸는 역할을 수행하는 스크립트.
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "changeContent") {
        console.log("respond");

        // 랜덤으로 바뀔 이미지의 URL주소
        const imageUrls = [
            'https://postfiles.pstatic.net/MjAyNDAyMDZfMTY0/MDAxNzA3MjAzMTYyNTY2.IubBhjC9GrSn7uFdLZ1bH6lte_n_kQlmsqhk0yUAbPwg.6tt12GaZytin9XSRO66YiLsQAbrobwMbcG1xTJCQzOog.PNG.kod0406/1.png?type=w773',
            'https://postfiles.pstatic.net/MjAyNDAyMDZfOTUg/MDAxNzA3MjAzMTYyNDgy.ZmiomMsSkl3entRNTpVIsKdvF6BOktBliEmjc5Ap9Zgg.fL7ZJ5hQ2nW37NCik89cQr_LZibDZxecClpvBpKLwq8g.PNG.kod0406/4.png?type=w773',
            'https://postfiles.pstatic.net/MjAyNDAyMDZfMTM2/MDAxNzA3MjAzMTYyNTc3.d_SKGZrgPux5owyjvDgFbcFsPrqIZP9W8WO1o73WN3Mg.39eo_MeCdjViKVJma-tKHuLdOv_B6Aw-_X4dUlN-mgAg.PNG.kod0406/3.png?type=w773',
            'https://postfiles.pstatic.net/MjAyNDAyMDZfMjUz/MDAxNzA3MjAzMTYyNTky.bbJv_hNE0B1pSwuYO3TGGLJKA4_pH177OXMiOySKPxwg.IUtLU2_rLAUPMEe2_BNL6HzfAV2olGUg1hQweB1X94Ig.PNG.kod0406/2.png?type=w773'
        ];


        if (window.location.href.includes("popup.html") || window.location.href.includes(".pdf")) {// 타이머를 표시하는 popup.html와 공부하는데 펼쳐놓는 .pdf는 바뀌지 않게 설정
            console.log("Script not executed on popup.html");
        } else {
            document.querySelectorAll('img[data-src]').forEach((el) => { //현재 페이지에서 data-src에 존재하는 img를 선택(지연로딩(Lazy Loading)이미지 처리에 사용)
                // Handle lazy-loaded images
                const randomIndex = Math.floor(Math.random() * imageUrls.length);
                el.setAttribute('data-src', imageUrls[randomIndex]);
            });

            document.querySelectorAll('*').forEach((el) => {
                const checkBgImage = getComputedStyle(el).backgroundImage !== "none";
                const isImgElement = el.tagName.toLowerCase() === 'img';
                //현재 페이지에서 img와 백그라운드 img를 선택
                if (checkBgImage || isImgElement) {
                    // For non-lazy-loaded images
                    const randomIndex = Math.floor(Math.random() * imageUrls.length);
                    el.src = imageUrls[randomIndex];
                }
            });

            const originalContents = [];//원래 문자열 저장
            document.querySelectorAll('*').forEach((el) => {
                // <script>와 <style>제외
                if (el.tagName.toLowerCase() !== 'script' && el.tagName.toLowerCase() !== 'style') {
                    // Store the original content of the element
                    originalContents.push({ element: el, content: el.innerHTML });

                    // <>밖에 있는 문자 대체
                    el.innerHTML = el.innerHTML.replace(/(?<=\>)(.*?)(?=\<)/g, (match) => {
                        // 메시지를 받을때마다 전체 문자열의 4%씩 교체(누적)
                        const randomNumber = Math.floor(Math.random() * 50);

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


