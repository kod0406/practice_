chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "changeContent") {
        if (window.location.href.includes("popup.html") || window.location.href.includes(".pdf")) {
            return; // 실행 중단
        }

        // data.json 파일을 불러옵니다.
        fetch(chrome.runtime.getURL('data.json'))
            .then(response => response.json())
            .then(data => {
                // JSON에서 이미지 경로를 가져와 전체 URL로 변환
                const imageUrls = data.imagePaths.map(path => chrome.runtime.getURL(path));

                // 이미지 소스 변경 로직
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

                // 텍스트 내용 변경
                const textNodes = [];
                const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
                let node;
                while(node = walk.nextNode()) {
                    // 스크립트나 스타일 태그 내부의 텍스트는 제외하고, 비어있지 않은 텍스트만 추가
                    if (node.parentElement.tagName !== 'SCRIPT' &&
                        node.parentElement.tagName !== 'STYLE' &&
                        node.nodeValue.trim() !== '') {
                        textNodes.push(node);
                    }
                }

                textNodes.forEach((textNode) => {
                    // 10% 확률로 텍스트를 변경
                    if (Math.random() < 0.1) {
                        const randomIndex = Math.floor(Math.random() * data.messages.length);
                        textNode.nodeValue = data.messages[randomIndex];
                    }
                });
            })
            .catch(() => {});
    }
});
