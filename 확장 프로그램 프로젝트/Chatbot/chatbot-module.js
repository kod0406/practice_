/**
 * 독립적인 챗봇 모듈
 * 어떤 HTML 페이지에서도 사용 가능한 범용 챗봇
 */

class ChatbotModule {
    constructor(options = {}) {
        this.options = {
            apiKey: options.apiKey || null,
            container: options.container || 'chatbot-container',
            layoutPath: options.layoutPath || 'components/chatbot/chatbot_layout.html',
            autoInit: options.autoInit !== false,
            position: options.position || 'bottom-left', // bottom-left, bottom-right, etc.
            ...options
        };

        this.isInitialized = false;
        this.chatHistory = [];
        this.userData = {
            message: null,
            file: { data: null, mimeType: null }
        };

        if (this.options.autoInit) {
            this.init();
        }
    }

    async init() {
        if (this.isInitialized) return;

        try {
            await this.loadLayout();
            this.initializeEventListeners();
            this.isInitialized = true;
            console.log('Chatbot Module initialized successfully');
        } catch (error) {
            console.error('Failed to initialize chatbot:', error);
        }
    }

    async loadLayout() {
        const container = document.getElementById(this.options.container) || document.body;

        try {
            // Chrome Extension 환경 체크
            const isExtension = typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.getURL;
            const url = isExtension
                ? chrome.runtime.getURL(this.options.layoutPath)
                : this.options.layoutPath;

            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to load chatbot layout');

            const html = await response.text();
            const wrapper = document.createElement('div');
            wrapper.innerHTML = html;

            // 위치 설정
            this.setPosition(wrapper, this.options.position);

            container.appendChild(wrapper);
            return true;
        } catch (error) {
            console.warn('Failed to load chatbot layout:', error);
            // 폴백: 기본 HTML 구조 생성
            this.createFallbackLayout(container);
            return false;
        }
    }

    setPosition(element, position) {
        const chatbotToggle = element.querySelector('#chatbot-toggle');
        const chatbotPopup = element.querySelector('.chatbot-popup');

        if (!chatbotToggle || !chatbotPopup) return;

        const positions = {
            'bottom-left': { bottom: '30px', left: '35px' },
            'bottom-right': { bottom: '30px', right: '35px' },
            'top-left': { top: '30px', left: '35px' },
            'top-right': { top: '30px', right: '35px' }
        };

        const pos = positions[position] || positions['bottom-left'];
        Object.assign(chatbotToggle.style, pos);

        // 팝업 위치도 조정
        const popupPos = { ...pos };
        if (position.includes('bottom')) {
            popupPos.bottom = '90px';
        } else {
            popupPos.top = '90px';
        }
        Object.assign(chatbotPopup.style, popupPos);
    }

    createFallbackLayout(container) {
        const fallbackHtml = `
            <button id="chatbot-toggle" style="position: fixed; bottom: 30px; left: 35px; z-index: 9999; width: 50px; height: 50px; border-radius: 50%; background: #5350C4; border: none; color: white; cursor: pointer;">
                💬
            </button>
            <div class="chatbot-popup" style="position: fixed; left: 35px; bottom: 90px; width: 420px; background: white; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); display: none; z-index: 9998;">
                <div class="chat-header" style="background: #5350C4; color: white; padding: 15px; display: flex; justify-content: space-between; align-items: center;">
                    <h3 style="margin: 0;">Chatbot</h3>
                    <button id="close-chatbot" style="background: none; border: none; color: white; cursor: pointer; font-size: 24px;">&times;</button>
                </div>
                <div class="chat-body" style="height: 300px; padding: 20px; overflow-y: auto;">
                    <div class="message bot-message">
                        <div class="message-text" style="background: #f2f2ff; padding: 12px; border-radius: 12px; margin-bottom: 10px;">
                            안녕하세요! 챗봇입니다. API 키를 설정해주세요.
                        </div>
                    </div>
                </div>
                <div class="chat-footer" style="padding: 15px; border-top: 1px solid #eee;">
                    <div class="chat-form" style="display: flex; gap: 10px; align-items: center; border: 1px solid #ddd; border-radius: 25px; padding: 8px 12px;">
                        <textarea class="message-input" placeholder="메시지를 입력하세요..." style="flex: 1; border: none; outline: none; resize: none; min-height: 20px; font-family: inherit;"></textarea>
                        <button id="send-message" style="background: #5350C4; color: white; border: none; border-radius: 50%; width: 35px; height: 35px; cursor: pointer;">➤</button>
                    </div>
                </div>
            </div>
        `;

        const wrapper = document.createElement('div');
        wrapper.innerHTML = fallbackHtml;
        container.appendChild(wrapper);
    }

    initializeEventListeners() {
        const chatbotToggle = document.querySelector('#chatbot-toggle');
        const closeChatbot = document.querySelector('#close-chatbot');
        const sendButton = document.querySelector('#send-message');
        const messageInput = document.querySelector('.message-input');
        const chatbotPopup = document.querySelector('.chatbot-popup');

        if (chatbotToggle) {
            chatbotToggle.addEventListener('click', () => {
                if (chatbotPopup) {
                    const isVisible = chatbotPopup.style.display !== 'none';
                    chatbotPopup.style.display = isVisible ? 'none' : 'block';
                }
            });
        }

        if (closeChatbot) {
            closeChatbot.addEventListener('click', () => {
                if (chatbotPopup) {
                    chatbotPopup.style.display = 'none';
                }
            });
        }

        if (sendButton && messageInput) {
            const handleSend = () => this.sendMessage();

            sendButton.addEventListener('click', handleSend);
            messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                }
            });
        }
    }

    async sendMessage() {
        const messageInput = document.querySelector('.message-input');
        const chatBody = document.querySelector('.chat-body');

        if (!messageInput || !chatBody) return;

        const message = messageInput.value.trim();
        if (!message) return;

        // 사용자 메시지 추가
        this.addMessage(message, 'user');
        messageInput.value = '';

        // 봇 응답 처리
        this.addMessage('생각중...', 'bot', true);

        try {
            const response = await this.callAPI(message);
            this.updateLastBotMessage(response);
        } catch (error) {
            this.updateLastBotMessage('죄송합니다. 오류가 발생했습니다: ' + error.message);
        }
    }

    addMessage(content, type, isThinking = false) {
        const chatBody = document.querySelector('.chat-body');
        if (!chatBody) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;

        const messageText = document.createElement('div');
        messageText.className = 'message-text';
        messageText.style.cssText = type === 'user'
            ? 'background: #5350C4; color: white; padding: 12px; border-radius: 12px; margin-bottom: 10px; margin-left: auto; max-width: 80%; text-align: right;'
            : 'background: #f2f2ff; padding: 12px; border-radius: 12px; margin-bottom: 10px; max-width: 80%;';

        messageText.textContent = content;
        if (isThinking) messageText.classList.add('thinking');

        messageDiv.appendChild(messageText);
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    updateLastBotMessage(content) {
        const messages = document.querySelectorAll('.bot-message .message-text');
        const lastMessage = messages[messages.length - 1];
        if (lastMessage) {
            lastMessage.textContent = content;
            lastMessage.classList.remove('thinking');
        }
    }

    async callAPI(message) {
        if (!this.options.apiKey) {
            return 'API 키가 설정되지 않았습니다. 챗봇 생성 시 apiKey 옵션을 제공해주세요.';
        }

        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.options.apiKey}`;

        this.chatHistory.push({
            role: 'user',
            parts: [{ text: message }]
        });

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: this.chatHistory })
        });

        if (!response.ok) {
            throw new Error(`API 호출 실패: ${response.status}`);
        }

        const data = await response.json();
        const botResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || '응답을 받지 못했습니다.';

        this.chatHistory.push({
            role: 'model',
            parts: [{ text: botResponse }]
        });

        return botResponse;
    }

    // 공개 메서드들
    setApiKey(apiKey) {
        this.options.apiKey = apiKey;
    }

    show() {
        const popup = document.querySelector('.chatbot-popup');
        if (popup) popup.style.display = 'block';
    }

    hide() {
        const popup = document.querySelector('.chatbot-popup');
        if (popup) popup.style.display = 'none';
    }

    destroy() {
        const container = document.getElementById(this.options.container);
        if (container) container.innerHTML = '';
        this.isInitialized = false;
    }
}

// 전역으로 사용 가능하게 만들기
window.ChatbotModule = ChatbotModule;

// 자동 초기화 (옵션)
document.addEventListener('DOMContentLoaded', () => {
    // data-chatbot 속성을 가진 요소가 있으면 자동 초기화
    const autoInitElements = document.querySelectorAll('[data-chatbot]');
    autoInitElements.forEach(element => {
        const options = {};

        // data 속성들을 옵션으로 변환
        if (element.dataset.apiKey) options.apiKey = element.dataset.apiKey;
        if (element.dataset.position) options.position = element.dataset.position;

        new ChatbotModule({
            ...options,
            container: element.id || 'chatbot-container'
        });
    });
});
