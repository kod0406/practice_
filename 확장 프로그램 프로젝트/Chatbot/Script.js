import config from "./API.js";

const messageInput = document.querySelector(".message-input");
const chatBody = document.querySelector(".chat-body");
const sendMessageButton = document.querySelector("#send-message");
const fileInput = document.querySelector("#file-input");
const fileUploadWrapper = document.querySelector(".file-upload-wrapper");
const fileCancelButton = document.querySelector("#file-cancel");
const chatbotToggle = document.querySelector("#chatbot-toggle");
const closeChatbot = document.querySelector("#close-chatbot");

const API_KEY = config.API_KEY;

const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

const userData = {
    message : null,
    file:{
        data:null,
        mimeType:null,
    }
}

const chatHistory = [];

const initialInputHeight = messageInput.scrollHeight;

//메시지 내용과 추가 클래스를 적용한 새로운 div 요소를 생성해 반환
const createMessageElement = (content,...classes) =>{
    const div = document.createElement("div");
    div.classList.add("message",...classes);
    div.innerHTML = content;
    return div;
}
//API한테 데이터 전송
const generateBotResponse = async (incomingMessageDiv) => {
    const messageElement = incomingMessageDiv.querySelector(".message-text");

    //사용자의 메시지 기록
    chatHistory.push({
        role : "user",
        parts: [{ text: userData.message }, ...(userData.file.data ? [{inline_data: userData.file}] : [])]
    });

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            contents: chatHistory
        })
    }
    resetFileData();//데이터 초기화
    try {
        const response = await fetch(API_URL, requestOptions);
        const data = await response.json();

        if (!response.ok) throw new Error(data.error.message || "API 호출 중 오류가 발생했습니다.");

        const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
        messageElement.innerText = apiResponseText;

        //이전 채팅 기록 응답 기능
        chatHistory.push({
            role: "model",
            parts: [{text: apiResponseText}]
        });
    } catch (error) {
        console.log(error);

        // 사용자 친화적인 에러 메시지로 변환
        let userFriendlyMessage = "죄송합니다. 대화 처리 중 문제가 발생했습니다.";

        // 에러 유형에 따른 메시지 설정 (영어 에러 메시지를 한국어로 변환)
        if (error.message.includes("quota") || error.message.includes("limit")) {
            userFriendlyMessage = "일일 사용량을 초과했습니다. 잠시 후 다시 시도해주세요.";
        } else if (error.message.includes("network") || error.message.includes("connection")) {
            userFriendlyMessage = "네트워크 연결에 문제가 있습니다. 인터넷 연결을 확인해주세요.";
        } else if (error.message.includes("timeout")) {
            userFriendlyMessage = "서버 응답 시간이 초과되었습니다. 잠시 후 다시 시도해주세요.";
        } else if (error.message.includes("unauthorized") || error.message.includes("API key")) {
            userFriendlyMessage = "API 키가 유효하지 않습니다. 관리자에게 문의하세요.";
        }

        // 에러 메시지 표시 (개발자용 상세 에러는 작은 글씨로)
        messageElement.innerHTML = `
            <div style="color: #e74c3c;">${userFriendlyMessage}</div>
            <details style="font-size: 0.8em; color: #7f8c8d; margin-top: 8px;">
                <summary>개발자 정보 보기</summary>
                ${error.message}
            </details>
            <div style="margin-top: 8px;">다시 메시지를 보내거나 나중에 다시 시도해주세요.</div>
        `;
    } finally {
        //첨부된 파일을 초기화하고 챗봇이 생각하는 효과를 제거
        userData.file = {};
        incomingMessageDiv.classList.remove("thinking");
        chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });

    }
}

// UI만 초기화하는 함수
const resetFileUI = () => {
    fileUploadWrapper.classList.remove("file-uploaded", "text-file", "image-file");
    fileUploadWrapper.querySelector("img").style.display = "none";

    // 파일 업로드 버튼을 원래 상태로 완전히 복원
    const fileUploadButton = document.querySelector("#file-upload");
    fileUploadButton.style.display = "block";
    fileUploadButton.className = "material-symbols-outlined";
    fileUploadButton.textContent = "attach_file";
    fileUploadButton.removeAttribute("style");
};

// 데이터만 초기화하는 함수
const resetFileData = () => {
    userData.file = {};
};

//사용자의 메시지를 처리
const resetFileInput = () => {
    resetFileUI();
    resetFileData();
};

// 중복 이벤트 리스너 제거하고 새 함수 사용
fileCancelButton.addEventListener("click", resetFileInput);

// handleOutgoingMessage 함수에서 파일 상태 초기화 부분 수정
const handleOutgoingMessage = (e) => {
    e.preventDefault();
    userData.message = messageInput.value.trim();
    messageInput.value = "";

    // 파일 유형에 따라 다른 내용 표시
    let fileContent = "";
    if (userData.file.data) {
        if (userData.file.mimeType.startsWith('image/')) {
            // 이미지 파일
            fileContent = `<img src="data:${userData.file.mimeType};base64,${userData.file.data}" class="attachment"/>`;
        } else {
            // 텍스트 파일 (커스텀 아이콘 표시)
            fileContent = `<div class="text-attachment"><span class="material-symbols-outlined">docs</span></div>`;
        }
    }

    const messageContent = `<div class="message-text"></div>${fileContent}`;
    const outgoingMessageDiv = createMessageElement(messageContent, "user-message");
    outgoingMessageDiv.querySelector(".message-text").textContent = userData.message;
    chatBody.appendChild(outgoingMessageDiv);

    resetFileUI();
    messageInput.dispatchEvent(new Event("input"));

    chatBody.scrollTo({top: chatBody.scrollHeight, behavior: "smooth"});

    //챗봇이 생각후 답변하는듯한 기능
    setTimeout(() => {
        const messageContent = `<svg class = "bot-avatar" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1024 1024">
                <path d="M738.3 287.6H285.7c-59
                0-106.8 47.8-106.8 106.8v303.1c0
                59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1
                1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0
                106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7
                448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9
                53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9
                267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5
                109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5
                53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5
                53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7
                35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2
                609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4
                0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9
                49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9
                23.3 51.9 51.9z">
                </path>
            </svg>
            <div class="message-text">
                <div class="thinking-indicator">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            </div>`;

        const incomingMessageDiv = createMessageElement(messageContent, "bot-message","thinking");
        //incomingMessageDiv.querySelector(".message-text").textContent = userData.message;
        chatBody.appendChild(incomingMessageDiv);
        chatBody.scrollTo({top:chatBody.scrollHeight,behavior:"smooth"});
        generateBotResponse(incomingMessageDiv).finally(() => resetFileInput());
    },600);
}

//엔터키를 누르면 메시지 보내기
messageInput.addEventListener("keydown",(e) =>{
    const userMessage = e.target.value.trim();
    if(e.key === "Enter"&& userMessage && !e.shiftKey && window.innerWidth > 768){
        handleOutgoingMessage(e);
    }
});

//입력량에 따라 입력창의 높이가 동적으로 변경
messageInput.addEventListener("input",() => {
   messageInput.style.height = `${initialInputHeight}px`;
   messageInput.style.height = `${messageInput.scrollHeight}px`;
   document.querySelector(".chat-form").style.borderRadius
       = messageInput.scrollHeight > initialInputHeight ? "15px" : "32px";
});

//파일 첨부기능 + 이미지 미리보기
fileInput.addEventListener("change", (e) => {
    const file = fileInput.files[0];
    if (!file) return;


    const reader = new FileReader();
    reader.onload = (e) => {

        fileUploadWrapper.classList.add("file-uploaded");

        if (file.type.startsWith('image/')) {
            fileUploadWrapper.querySelector("img").src = e.target.result;
            fileUploadWrapper.querySelector("img").style.display = "block";
            document.querySelector("#file-upload").style.display = "none";
            fileUploadWrapper.classList.add("image-file");
            fileUploadWrapper.classList.remove("text-file");
        } else {
            fileUploadWrapper.querySelector("img").style.display = "none";
            document.querySelector("#file-upload").style.display = "block";
            document.querySelector("#file-upload").innerHTML = '<span class="material-symbols-outlined">docs</span>';
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

// 파일 삭제 시 원래 아이콘으로 되돌리기
fileCancelButton.addEventListener("click", (e) => {
    userData.file = {};
    fileUploadWrapper.classList.remove("file-uploaded");
    fileUploadWrapper.querySelector("img").style.display = "none";
    document.querySelector("#file-upload").style.display = "block";
    document.querySelector("#file-upload").innerHTML = '<span class="material-symbols-outlined">attach_file</span>';
});

//파일 삭제
fileCancelButton.addEventListener("click", (e) => {
    userData.file = {};
    fileUploadWrapper.classList.remove("file-uploaded");
    fileUploadWrapper.querySelector("img").style.display = "none";

    // 파일 업로드 버튼을 원래 상태로 완전히 복원
    const fileUploadButton = document.querySelector("#file-upload");
    fileUploadButton.style.display = "block";

    // 중첩된 span 구조 대신 원래의 텍스트 콘텐츠로 복원
    fileUploadButton.className = "material-symbols-outlined";
    fileUploadButton.textContent = "attach_file";

    // 추가된 인라인 스타일 모두 제거
    fileUploadButton.removeAttribute("style");

    // 추가 클래스 제거
    fileUploadWrapper.classList.remove("text-file", "image-file");
});

//이모지 선택기
const picker = new EmojiMart.Picker({
    theme: "light",
    skinTonePosition: "none",
    previewPosition: "none",
    onEmojiSelect: (emoji) => {
        const{ selectionStart: start,selectionEnd: end } = messageInput;
        messageInput.setRangeText(emoji.native,start,end,"end");
        messageInput.focus();
    },
    onClickOutside: (e) => {
        if(e.target.id === "emoji-picker"){
            document.body.classList.toggle("show-emoji-picker");
        }else{
            document.body.classList.remove("show-emoji-picker");
        }
    }
});

document.querySelector(".chat-form").appendChild(picker);

sendMessageButton.addEventListener("click",(e) =>handleOutgoingMessage(e))
document.querySelector("#file-upload").addEventListener("click",() => fileInput.click());

chatbotToggle.addEventListener("click",() => document.body.classList.toggle("show-chatbot"));

closeChatbot.addEventListener("click",() => document.body.classList.remove("show-chatbot"));