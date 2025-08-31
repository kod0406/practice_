// Chrome Extension 환경용 챗봇 모듈
async function loadChatbotLayout() {
    try {
        // 이미 로드되어 있다면 중복 주입 방지
        if (document.querySelector('#chatbot-toggle') || document.querySelector('.chatbot-popup')) {
            return true;
        }
        const container = document.getElementById('chatbot-container') || document.body;
        const url = chrome?.runtime?.getURL ? chrome.runtime.getURL('components/chatbot/chatbot_layout.html') : 'components/chatbot/chatbot_layout.html';
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error('챗봇 레이아웃 로드 실패');
        const html = await res.text();
        const wrapper = document.createElement('div');
        wrapper.innerHTML = html;
        // 주입
        container.appendChild(wrapper);
        return true;
    } catch (e) {
        console.warn('[Chatbot] 레이아웃 주입 실패:', e);
        return false;
    }
}

async function getApiKey() {
    try {
        const result = await chrome.storage.local.get(['gemini_api_key']);
        if (result.gemini_api_key) {
            // Base64 디코딩으로 원본 키 복원
            return atob(result.gemini_api_key);
        }
        return null;
    } catch (error) {
        console.error('API 키 로드 중 오류:', error);
        return null;
    }
}

async function initializeChatbot() {
    // 설정 페이지에서 안전하게 저장된 API 키를 가져옴
    const API_KEY = await getApiKey();
    const API_URL = API_KEY
        ? `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`
        : null;

    // DOM 요소들을 함수 내부에서 선택
    const messageInput = document.querySelector(".message-input");
    const chatBody = document.querySelector(".chat-body");
    const sendMessageButton = document.querySelector("#send-message");
    const fileInput = document.querySelector("#file-input");
    const fileUploadWrapper = document.querySelector(".file-upload-wrapper");
    const fileCancelButton = document.querySelector("#file-cancel");
    const chatbotToggle = document.querySelector("#chatbot-toggle");
    const closeChatbot = document.querySelector("#close-chatbot");

    // 요소가 존재하지 않으면 초기화 중단
    if (!messageInput || !chatBody || !chatbotToggle) {
        console.warn("Chatbot elements not found. Initialization aborted.");
        return;
    }

    const userData = {
        message: null,
        file: {
            data: null,
            mimeType: null,
        }
    };

    const chatHistory = [];
    const initialInputHeight = messageInput.scrollHeight;

    // 메시지 요소 생성 함수
    const createMessageElement = (content, ...classes) => {
        const div = document.createElement("div");
        div.classList.add("message", ...classes);
        div.innerHTML = content;
        return div;
    };

    // API 응답 생성 함수
    const generateBotResponse = async (incomingMessageDiv) => {
        const messageElement = incomingMessageDiv.querySelector(".message-text");

        chatHistory.push({
            role: "user",
            parts: [{ text: userData.message }, ...(userData.file.data ? [{ inline_data: userData.file }] : [])]
        });

        resetFileData();

        if (!API_URL) {
            messageElement.innerHTML = `
                <div style="color:#e67e22; margin-bottom: 10px;">
                    <strong>API 키가 설정되지 않았습니다.</strong>
                </div>
                <div style="font-size: 0.9rem; line-height: 1.4;">
                    챗봇을 사용하려면 Google Gemini API 키가 필요합니다.<br>
                    <button onclick="openSettings()" style="background: #5350C4; color: white; border: none; padding: 8px 12px; border-radius: 5px; margin-top: 8px; cursor: pointer;">
                        ⚙️ 설정에서 API 키 입력
                    </button>
                </div>
            `;
            incomingMessageDiv.classList.remove('thinking');
            return;
        }

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: chatHistory
            })
        };

        try {
            const response = await fetch(API_URL, requestOptions);
            const data = await response.json();

            if (!response.ok) throw new Error(data.error.message || "API 호출 중 오류가 발생했습니다.");

            const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
            messageElement.innerText = apiResponseText || '응답이 비어 있습니다.';

            chatHistory.push({
                role: "model",
                parts: [{ text: apiResponseText }]
            });
        } catch (error) {
            console.log(error);

            let userFriendlyMessage = "죄송합니다. 대화 처리 중 문제가 발생했습니다.";

            const msg = String(error?.message || '');
            if (msg.includes("quota") || msg.includes("limit")) {
                userFriendlyMessage = "일일 사용량을 초과했습니다. 잠시 후 다시 시도해주세요.";
            } else if (msg.includes("network") || msg.includes("connection")) {
                userFriendlyMessage = "네트워크 연결에 문제가 있습니다. 인터넷 연결을 확인해주세요.";
            } else if (msg.includes("timeout")) {
                userFriendlyMessage = "서버 응답 시간이 초과되었습니다. 잠시 후 다시 시도해주세요.";
            } else if (msg.includes("unauthorized") || msg.toLowerCase().includes("api key")) {
                userFriendlyMessage = "API 키가 유효하지 않습니다. 설정을 확인하세요.";
            }

            messageElement.innerHTML = `
                <div style="color: #e74c3c;">${userFriendlyMessage}</div>
                <details style="font-size: 0.8em; color: #7f8c8d; margin-top: 8px;">
                    <summary>개발자 정보 보기</summary>
                    ${msg}
                </details>
                <div style="margin-top: 8px;">다시 메시지를 보내거나 나중에 다시 시도해주세요.</div>
            `;
        } finally {
            userData.file = {};
            incomingMessageDiv.classList.remove("thinking");
            chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
        }
    };

    // 설정 페이지 열기 함수
    window.openSettings = function() {
        chrome.tabs.create({
            url: chrome.runtime.getURL('settings.html')
        });
    };

    // API 키 업데이트 메시지 수신
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.type === 'API_KEY_UPDATED') {
            // 챗봇 다시 초기화
            location.reload(); // 간단한 방법: 페이지 새로고침
            sendResponse({success: true});
        }
    });

    // 파일 관련 함수들
    const resetFileUI = () => {
        fileUploadWrapper.classList.remove("file-uploaded", "text-file", "image-file");
        const imgElement = fileUploadWrapper.querySelector("img");
        if (imgElement) imgElement.style.display = "none";

        const fileUploadButton = document.querySelector("#file-upload");
        if (fileUploadButton) {
            fileUploadButton.style.display = "block";
            fileUploadButton.className = "material-symbols-outlined";
            fileUploadButton.textContent = "attach_file";
            fileUploadButton.removeAttribute("style");
        }
    };

    const resetFileData = () => {
        userData.file = {};
    };

    const resetFileInput = () => {
        resetFileUI();
        resetFileData();
    };

    // 메시지 전송 처리 함수
    const handleOutgoingMessage = (e) => {
        e.preventDefault();
        userData.message = messageInput.value.trim();
        if (!userData.message && !userData.file?.data) return;
        messageInput.value = "";

        let fileContent = "";
        if (userData.file.data) {
            if (userData.file.mimeType.startsWith('image/')) {
                fileContent = `<img src="data:${userData.file.mimeType};base64,${userData.file.data}" class="attachment" alt="첨부 이미지"/>`;
            } else {
                fileContent = `<div class="text-attachment"><span class="material-symbols-outlined">docs</span></div>`;
            }
        }

        const messageContent = `<div class="message-text"></div>${fileContent}`;
        const outgoingMessageDiv = createMessageElement(messageContent, "user-message");
        outgoingMessageDiv.querySelector(".message-text").textContent = userData.message;
        chatBody.appendChild(outgoingMessageDiv);

        resetFileUI();
        messageInput.dispatchEvent(new Event("input"));
        chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });

        setTimeout(() => {
            const messageContent = `<svg class="bot-avatar" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1024 1024">
                <path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z"></path>
            </svg>
            <div class="message-text">
                <div class="thinking-indicator">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            </div>`;

            const incomingMessageDiv = createMessageElement(messageContent, "bot-message", "thinking");
            chatBody.appendChild(incomingMessageDiv);
            chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
            generateBotResponse(incomingMessageDiv).finally(() => resetFileInput());
        }, 300);
    };

    // 이벤트 리스너 등록
    if (messageInput) {
        messageInput.addEventListener("keydown", (e) => {
            const userMessage = e.target.value.trim();
            if (e.key === "Enter" && userMessage && !e.shiftKey && window.innerWidth > 768) {
                handleOutgoingMessage(e);
            }
        });

        messageInput.addEventListener("input", () => {
            messageInput.style.height = `${initialInputHeight}px`;
            messageInput.style.height = `${messageInput.scrollHeight}px`;
            const chatForm = document.querySelector(".chat-form");
            if (chatForm) {
                chatForm.style.borderRadius = messageInput.scrollHeight > initialInputHeight ? "15px" : "32px";
            }
        });
    }

    // 파일 업로드 관련 이벤트 리스너들
    if (fileInput) {
        fileInput.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                if (file.type.startsWith("image/")) {
                    const imgElement = fileUploadWrapper.querySelector("img");
                    if (imgElement) {
                        imgElement.src = e.target.result;
                        imgElement.style.display = "block";
                    }
                    const uploadButton = document.querySelector("#file-upload");
                    if (uploadButton) uploadButton.style.display = "none";
                    fileUploadWrapper.classList.add("image-file");
                    fileUploadWrapper.classList.remove("text-file");
                } else {
                    const imgElement = fileUploadWrapper.querySelector("img");
                    if (imgElement) imgElement.style.display = "none";
                    const uploadButton = document.querySelector("#file-upload");
                    if (uploadButton) {
                        uploadButton.style.display = "block";
                        uploadButton.innerHTML = '<span class="material-symbols-outlined">description</span>';
                    }
                    fileUploadWrapper.classList.add("text-file");
                    fileUploadWrapper.classList.remove("image-file");
                }

                const base64String = e.target.result.split(",")[1];
                userData.file = {
                    data: base64String,
                    mimeType: file.type,
                };
                fileInput.value = "";
            };
            reader.readAsDataURL(file);
        });
    }

    if (fileCancelButton) {
        fileCancelButton.addEventListener("click", resetFileInput);
    }

    if (sendMessageButton) {
        sendMessageButton.addEventListener("click", handleOutgoingMessage);
    }

    const fileUploadButton = document.querySelector("#file-upload");
    if (fileUploadButton && fileInput) {
        fileUploadButton.addEventListener("click", () => fileInput.click());
    }

    // API 키 토글 기능 초기화
    function initializeApiKeyToggle() {
        const apiKeyHeader = document.querySelector('#api-key-header');
        const apiKeyContent = document.querySelector('#api-key-content');
        const apiToggleBtn = document.querySelector('#api-toggle-btn');
        const apiKeyInput = document.querySelector('#api-key-input');
        const saveApiKeyBtn = document.querySelector('#save-api-key');
        const apiStatus = document.querySelector('#api-status');

        if (!apiKeyHeader || !apiKeyContent || !apiToggleBtn) return;

        // 초기 상태에서 API 키 상태 확인
        checkApiKeyStatus();

        // 헤더 클릭으로 토글
        apiKeyHeader.addEventListener('click', (e) => {
            // 링크나 버튼 클릭은 토글하지 않음
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
            toggleApiSection();
        });

        // API 키 저장 버튼
        if (saveApiKeyBtn && apiKeyInput) {
            saveApiKeyBtn.addEventListener('click', async () => {
                const apiKey = apiKeyInput.value.trim();
                if (!apiKey) {
                    alert('API 키를 입력해주세요.');
                    return;
                }

                try {
                    // Base64로 인코딩하여 저장
                    await chrome.storage.local.set({ 
                        gemini_api_key: btoa(apiKey) 
                    });
                    
                    apiStatus.textContent = '✅ 설정됨';
                    apiStatus.className = 'api-status connected';
                    apiKeyInput.value = '';
                    
                    // 토글 섹션 닫기
                    toggleApiSection(false);
                    
                    alert('API 키가 성공적으로 저장되었습니다.');
                    
                    // 챗봇 재초기화
                    location.reload();
                } catch (error) {
                    console.error('API 키 저장 실패:', error);
                    alert('API 키 저장에 실패했습니다.');
                }
            });

            // Enter 키로도 저장 가능
            apiKeyInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    saveApiKeyBtn.click();
                }
            });
        }

        function toggleApiSection(force = null) {
            const isHidden = apiKeyContent.style.display === 'none';
            const shouldShow = force !== null ? force : isHidden;

            if (shouldShow) {
                apiKeyContent.style.display = 'block';
                apiToggleBtn.classList.add('expanded');
            } else {
                apiKeyContent.style.display = 'none';
                apiToggleBtn.classList.remove('expanded');
            }
        }

        async function checkApiKeyStatus() {
            const apiKey = await getApiKey();
            if (apiKey) {
                apiStatus.textContent = '✅ 설정됨';
                apiStatus.className = 'api-status connected';
            } else {
                apiStatus.textContent = '❌ 미설정';
                apiStatus.className = 'api-status';
            }
        }
    }

    // API 키 토글 기능 초기화
    initializeApiKeyToggle();

    if (chatbotToggle) {
        chatbotToggle.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
    }

    if (closeChatbot) {
        closeChatbot.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
    }

    // 이모지 픽커 초기화 (emoji-mart가 로드된 경우에만)
    if (typeof EmojiMart !== 'undefined' && messageInput) {
        try {
            const picker = new EmojiMart.Picker({
                theme: "light",
                skinTonePosition: "none",
                previewPosition: "none",
                onEmojiSelect: (emoji) => {
                    const { selectionStart: start, selectionEnd: end } = messageInput;
                    messageInput.setRangeText(emoji.native, start, end, "end");
                    messageInput.focus();
                },
                onClickOutside: (e) => {
                    if (e.target.id === "emoji-picker") {
                        document.body.classList.toggle("show-emoji-picker");
                    } else {
                        document.body.classList.remove("show-emoji-picker");
                    }
                }
            });

            const chatForm = document.querySelector(".chat-form");
            if (chatForm) {
                chatForm.appendChild(picker);
            }
        } catch (e) {
            console.warn('Emoji picker init failed:', e);
        }
    }

    console.log("Chatbot initialized successfully");
}

// 전역 스코프에서: 레이아웃 로드 후 초기화
(async function bootstrapChatbot() {
    const start = () => initializeChatbot();
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', async () => {
            await loadChatbotLayout();
            start();
        });
    } else {
        await loadChatbotLayout();
        start();
    }
})();