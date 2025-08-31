/**
 * 독립적인 챗봇 모듈 v2.0
 * 어떤 HTML 페이지에서도 사용 가능한 범용 챗봇
 *
 * 사용법:
 * const chatbot = new ChatbotModule({
 *     apiKey: 'your-api-key',
 *     position: 'bottom-right'
 * });
 */

class ChatbotModule {
    constructor(options = {}) {
        this.options = {
            apiKey: options.apiKey || null,
            container: options.container || 'chatbot-container',
            layoutPath: options.layoutPath || './chatbot_layout.html',
            cssPath: options.cssPath || './chatbot.css',
            autoInit: options.autoInit !== false,
            position: options.position || 'bottom-right',
            theme: options.theme || 'light', // light, dark
            enableFileUpload: options.enableFileUpload !== false,
            enableEmoji: options.enableEmoji !== false,
            maxFileSize: options.maxFileSize || 5 * 1024 * 1024, // 5MB
            ...options
        };

        this.isInitialized = false;
        this.chatHistory = [];
        this.userData = {
            message: null,
            file: { data: null, mimeType: null }
        };

        // 고유 인스턴스 ID 생성
        this.instanceId = 'chatbot-' + Math.random().toString(36).substr(2, 9);
        this.elements = {};

        if (this.options.autoInit) {
            this.init();
        }
    }

    async init() {
        if (this.isInitialized) return;

        try {
            await this.loadCSS();
            await this.loadLayout();
            this.initializeEventListeners();
            this.applyTheme();
            this.isInitialized = true;
            console.log('Chatbot Module initialized successfully');
            this.emit('initialized');
        } catch (error) {
            console.error('Failed to initialize chatbot:', error);
            this.emit('error', error);
        }
    }

    async loadCSS() {
        // 중복 로드 방지
        if (document.querySelector(`link[href*="chatbot.css"]`)) return;

        try {
            const isExtension = typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.getURL;
            const url = isExtension
                ? chrome.runtime.getURL(this.options.cssPath)
                : this.options.cssPath;

            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = url;
            document.head.appendChild(link);

            return new Promise((resolve, reject) => {
                link.onload = resolve;
                link.onerror = () => {
                    console.warn('Failed to load CSS, using inline styles');
                    this.injectFallbackCSS();
                    resolve();
                };
            });
        } catch (error) {
            console.warn('Failed to load CSS:', error);
            this.injectFallbackCSS();
        }
    }

    injectFallbackCSS() {
        const style = document.createElement('style');
        style.textContent = `
            .chatbot-popup {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                position: fixed;
                width: 420px;
                max-width: 90vw;
                background: white;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                z-index: 9998;
                display: none;
            }
            #chatbot-toggle {
                position: fixed;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: #5350C4;
                border: none;
                color: white;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                z-index: 9999;
                transition: all 0.3s ease;
            }
            #chatbot-toggle:hover { background: #3d39ac; }
            .chat-header { background: #5350C4; color: white; padding: 15px; display: flex; justify-content: space-between; align-items: center; }
            .chat-body { height: 300px; padding: 20px; overflow-y: auto; }
            .chat-footer { padding: 15px; border-top: 1px solid #eee; }
            .chat-form { display: flex; gap: 10px; align-items: center; border: 1px solid #ddd; border-radius: 25px; padding: 8px 12px; }
            .message-input { flex: 1; border: none; outline: none; resize: none; min-height: 20px; font-family: inherit; }
            .message { margin-bottom: 10px; }
            .user-message .message-text { background: #5350C4; color: white; padding: 12px; border-radius: 12px; margin-left: auto; max-width: 80%; }
            .bot-message .message-text { background: #f2f2ff; padding: 12px; border-radius: 12px; max-width: 80%; }
            #send-message { background: #5350C4; color: white; border: none; border-radius: 50%; width: 35px; height: 35px; cursor: pointer; }
        `;
        document.head.appendChild(style);
    }

    async loadLayout() {
        const container = document.getElementById(this.options.container) || document.body;

        try {
            const isExtension = typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.getURL;
            const url = isExtension
                ? chrome.runtime.getURL(this.options.layoutPath)
                : this.options.layoutPath;

            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to load chatbot layout');

            const html = await response.text();
            const wrapper = document.createElement('div');
            wrapper.innerHTML = html;

            // 고유 ID 적용
            this.updateElementIds(wrapper);
            this.setPosition(wrapper, this.options.position);

            container.appendChild(wrapper);
            this.cacheElements();
            return true;
        } catch (error) {
            console.warn('Failed to load chatbot layout:', error);
            this.createFallbackLayout(container);
            return false;
        }
    }

    updateElementIds(wrapper) {
        // 고유한 ID로 변경하여 다중 인스턴스 지원
        const elements = wrapper.querySelectorAll('[id]');
        elements.forEach(el => {
            const oldId = el.id;
            const newId = `${oldId}-${this.instanceId}`;
            el.id = newId;

            // label의 for 속성도 업데이트
            const labels = wrapper.querySelectorAll(`[for="${oldId}"]`);
            labels.forEach(label => label.setAttribute('for', newId));
        });
    }

    cacheElements() {
        this.elements = {
            toggle: document.querySelector(`#chatbot-toggle-${this.instanceId}`),
            popup: document.querySelector('.chatbot-popup'),
            closeBtn: document.querySelector(`#close-chatbot-${this.instanceId}`),
            chatBody: document.querySelector('.chat-body'),
            messageInput: document.querySelector('.message-input'),
            sendBtn: document.querySelector(`#send-message-${this.instanceId}`),
            fileInput: document.querySelector(`#file-input-${this.instanceId}`),
            fileUpload: document.querySelector(`#file-upload-${this.instanceId}`),
            fileCancel: document.querySelector(`#file-cancel-${this.instanceId}`),
            emojiBtn: document.querySelector(`#emoji-picker-${this.instanceId}`)
        };
    }

    setPosition(element, position) {
        const toggle = element.querySelector('[id*="chatbot-toggle"]');
        const popup = element.querySelector('.chatbot-popup');

        if (!toggle || !popup) return;

        const positions = {
            'bottom-left': { bottom: '30px', left: '35px' },
            'bottom-right': { bottom: '30px', right: '35px' },
            'top-left': { top: '30px', left: '35px' },
            'top-right': { top: '30px', right: '35px' }
        };

        const pos = positions[position] || positions['bottom-right'];
        Object.assign(toggle.style, pos);

        const popupPos = { ...pos };
        if (position.includes('bottom')) {
            popupPos.bottom = '90px';
            delete popupPos.top;
        } else {
            popupPos.top = '90px';
            delete popupPos.bottom;
        }
        Object.assign(popup.style, popupPos);
    }

    createFallbackLayout(container) {
        const fallbackHtml = `
            <button id="chatbot-toggle-${this.instanceId}" style="position: fixed; bottom: 30px; right: 35px; z-index: 9999; width: 50px; height: 50px; border-radius: 50%; background: #5350C4; border: none; color: white; cursor: pointer;">
                💬
            </button>
            <div class="chatbot-popup" style="position: fixed; right: 35px; bottom: 90px; width: 420px; max-width: 90vw; background: white; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); display: none; z-index: 9998;">
                <div class="chat-header" style="background: #5350C4; color: white; padding: 15px; display: flex; justify-content: space-between; align-items: center; border-radius: 15px 15px 0 0;">
                    <h3 style="margin: 0; font-size: 1.2rem;">Chatbot</h3>
                    <button id="close-chatbot-${this.instanceId}" style="background: none; border: none; color: white; cursor: pointer; font-size: 24px;">&times;</button>
                </div>
                <div class="chat-body" style="height: 300px; padding: 20px; overflow-y: auto; background: #fafafa;">
                    <div class="message bot-message">
                        <div class="message-text" style="background: #f2f2ff; padding: 12px; border-radius: 12px; margin-bottom: 10px; max-width: 80%;">
                            안녕하세요! 챗봇입니다. ${this.options.apiKey ? '무엇을 도와드릴까요?' : 'API 키를 설정해주세요.'}
                        </div>
                    </div>
                </div>
                <div class="chat-footer" style="padding: 15px; border-top: 1px solid #eee; background: white; border-radius: 0 0 15px 15px;">
                    <div class="chat-form" style="display: flex; gap: 10px; align-items: center; border: 1px solid #ddd; border-radius: 25px; padding: 8px 12px;">
                        <textarea class="message-input" placeholder="메시지를 입력하세요..." style="flex: 1; border: none; outline: none; resize: none; min-height: 20px; font-family: inherit; background: transparent;"></textarea>
                        <button id="send-message-${this.instanceId}" style="background: #5350C4; color: white; border: none; border-radius: 50%; width: 35px; height: 35px; cursor: pointer; display: flex; align-items: center; justify-content: center;">➤</button>
                    </div>
                </div>
            </div>
        `;

        const wrapper = document.createElement('div');
        wrapper.innerHTML = fallbackHtml;
        container.appendChild(wrapper);
        this.cacheElements();
    }

    initializeEventListeners() {
        const { toggle, popup, closeBtn, sendBtn, messageInput, fileInput, fileUpload, fileCancel, emojiBtn } = this.elements;

        // 토글 버튼
        if (toggle) {
            toggle.addEventListener('click', () => this.toggleChat());
        }

        // 닫기 버튼
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hide());
        }

        // 메시지 전송
        if (sendBtn && messageInput) {
            const handleSend = () => this.sendMessage();

            sendBtn.addEventListener('click', handleSend);
            messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                }
            });

            // 입력 시 자동 크기 조정
            messageInput.addEventListener('input', () => {
                messageInput.style.height = 'auto';
                messageInput.style.height = Math.min(messageInput.scrollHeight, 120) + 'px';
            });
        }

        // 파일 업로드 (옵션이 활성화된 경우)
        if (this.options.enableFileUpload && fileInput && fileUpload) {
            fileUpload.addEventListener('click', () => fileInput.click());
            fileInput.addEventListener('change', (e) => this.handleFileUpload(e));
            if (fileCancel) {
                fileCancel.addEventListener('click', () => this.cancelFileUpload());
            }
        }

        // 이모지 버튼 (옵션이 활성화된 경우)
        if (this.options.enableEmoji && emojiBtn) {
            emojiBtn.addEventListener('click', () => this.toggleEmojiPicker());
        }

        // API 키 토글 기능 초기화
        this.initializeApiKeyToggle();

        // 외부 클릭 시 닫기
        document.addEventListener('click', (e) => {
            if (popup && !popup.contains(e.target) && !toggle.contains(e.target)) {
                // 잠깐 딜레이를 주어 버튼 클릭 완료 후 실행
                setTimeout(() => {
                    if (popup.style.display === 'block') {
                        this.hide();
                    }
                }, 100);
            }
        });
    }

    // API 키 토글 기능 초기화
    initializeApiKeyToggle() {
        const apiKeyHeader = document.querySelector(`#api-key-header-${this.instanceId}`) || document.querySelector('#api-key-header');
        const apiKeyContent = document.querySelector(`#api-key-content-${this.instanceId}`) || document.querySelector('#api-key-content');
        const apiToggleBtn = document.querySelector(`#api-toggle-btn-${this.instanceId}`) || document.querySelector('#api-toggle-btn');
        const apiKeyInput = document.querySelector(`#api-key-input-${this.instanceId}`) || document.querySelector('#api-key-input');
        const saveApiKeyBtn = document.querySelector(`#save-api-key-${this.instanceId}`) || document.querySelector('#save-api-key');
        const apiStatus = document.querySelector(`#api-status-${this.instanceId}`) || document.querySelector('#api-status');

        if (!apiKeyHeader || !apiKeyContent || !apiToggleBtn) return;

        // 초기 상태에서 API 키 상태 확인
        this.checkApiKeyStatus();

        // 헤더 클릭으로 토글
        apiKeyHeader.addEventListener('click', (e) => {
            // 링크나 버튼 클릭은 토글하지 않음
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
            this.toggleApiSection();
        });

        // API 키 저장 버튼
        if (saveApiKeyBtn && apiKeyInput) {
            saveApiKeyBtn.addEventListener('click', () => {
                const apiKey = apiKeyInput.value.trim();
                if (!apiKey) {
                    alert('API 키를 입력해주세요.');
                    return;
                }

                try {
                    this.setApiKey(apiKey);
                    apiStatus.textContent = '✅ 설정됨';
                    apiStatus.className = 'api-status connected';
                    apiKeyInput.value = '';
                    
                    // 토글 섹션 닫기
                    this.toggleApiSection(false);
                    
                    alert('API 키가 성공적으로 저장되었습니다.');
                    
                    // 웰컴 메시지 업데이트
                    this.updateWelcomeMessage();
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
    }

    toggleApiSection(force = null) {
        const apiKeyContent = document.querySelector(`#api-key-content-${this.instanceId}`) || document.querySelector('#api-key-content');
        const apiToggleBtn = document.querySelector(`#api-toggle-btn-${this.instanceId}`) || document.querySelector('#api-toggle-btn');
        
        if (!apiKeyContent || !apiToggleBtn) return;

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

    checkApiKeyStatus() {
        const apiStatus = document.querySelector(`#api-status-${this.instanceId}`) || document.querySelector('#api-status');
        if (!apiStatus) return;

        if (this.options.apiKey) {
            apiStatus.textContent = '✅ 설정됨';
            apiStatus.className = 'api-status connected';
        } else {
            apiStatus.textContent = '❌ 미설정';
            apiStatus.className = 'api-status';
        }
    }

    updateWelcomeMessage() {
        const { chatBody } = this.elements;
        if (!chatBody) return;

        const existingWelcome = chatBody.querySelector('.bot-message .message-text');
        if (existingWelcome) {
            existingWelcome.textContent = this.options.apiKey 
                ? '안녕하세요😀 무엇을 도와드릴까요?' 
                : '안녕하세요😀 API 키를 설정하면 대화를 시작할 수 있어요!';
        }
    }

    async sendMessage() {
        const { messageInput, chatBody } = this.elements;

        if (!messageInput || !chatBody) return;

        const message = messageInput.value.trim();
        if (!message && !this.userData.file?.data) return;

        // 사용자 메시지 추가
        this.addMessage(message, 'user');
        messageInput.value = '';
        messageInput.style.height = 'auto';

        // 봇 응답 처리
        const thinkingMessage = this.addMessage('생각중...', 'bot', true);

        try {
            const response = await this.callAPI(message);
            this.updateMessage(thinkingMessage, response);
            this.emit('message-sent', { message, response });
        } catch (error) {
            this.updateMessage(thinkingMessage, '죄송합니다. 오류가 발생했습니다: ' + error.message);
            this.emit('error', error);
        }

        // 파일 데이터 초기화
        this.userData.file = { data: null, mimeType: null };
    }

    addMessage(content, type, isThinking = false) {
        const { chatBody } = this.elements;
        if (!chatBody) return null;

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;

        const messageText = document.createElement('div');
        messageText.className = 'message-text';

        const baseStyle = 'padding: 12px; border-radius: 12px; margin-bottom: 10px; word-wrap: break-word; line-height: 1.4;';
        messageText.style.cssText = type === 'user'
            ? baseStyle + 'background: #5350C4; color: white; margin-left: auto; max-width: 80%; text-align: left;'
            : baseStyle + 'background: #f2f2ff; max-width: 80%; color: #333;';

        messageText.textContent = content;
        if (isThinking) {
            messageText.classList.add('thinking');
            messageText.style.fontStyle = 'italic';
            messageText.style.opacity = '0.7';
        }

        messageDiv.appendChild(messageText);
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;

        return messageText;
    }

    updateMessage(messageElement, content) {
        if (messageElement) {
            messageElement.textContent = content;
            messageElement.classList.remove('thinking');
            messageElement.style.fontStyle = 'normal';
            messageElement.style.opacity = '1';
        }
    }

    async callAPI(message) {
        if (!this.options.apiKey) {
            return 'API 키가 설정되지 않았습니다. setApiKey() 메서드를 사용하거나 생성 시 apiKey 옵션을 제공해주세요.';
        }

        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.options.apiKey}`;

        // 파일이 있는 경우 포함
        const parts = [{ text: message }];
        if (this.userData.file?.data) {
            parts.push({ inline_data: this.userData.file });
        }

        this.chatHistory.push({
            role: 'user',
            parts: parts
        });

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: this.chatHistory,
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 1000
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`API 호출 실패 (${response.status}): ${errorData.error?.message || response.statusText}`);
        }

        const data = await response.json();
        const botResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || '응답을 받지 못했습니다.';

        this.chatHistory.push({
            role: 'model',
            parts: [{ text: botResponse }]
        });

        return botResponse;
    }

    handleFileUpload(event) {
        const file = event.target.files?.[0];
        if (!file) return;

        // 파일 크기 체크
        if (file.size > this.options.maxFileSize) {
            alert(`파일 크기는 ${this.options.maxFileSize / 1024 / 1024}MB를 초과할 수 없습니다.`);
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const base64String = e.target.result.split(',')[1];
            this.userData.file = {
                data: base64String,
                mimeType: file.type,
                name: file.name
            };

            this.addMessage(`📎 파일 첨부됨: ${file.name}`, 'user');
            event.target.value = ''; // 파일 입력 초기화
        };

        reader.readAsDataURL(file);
    }

    cancelFileUpload() {
        this.userData.file = { data: null, mimeType: null };
        // UI에서 파일 표시 제거 로직 추가 가능
    }

    toggleEmojiPicker() {
        // 이모지 픽커 토글 로직 (외부 라이브러리 필요)
        console.log('Emoji picker toggle - implement with external library');
    }

    // 공개 메서드들
    toggleChat() {
        const { popup } = this.elements;
        if (!popup) return;

        const isVisible = popup.style.display === 'block';
        if (isVisible) {
            this.hide();
        } else {
            this.show();
        }
    }

    show() {
        const { popup } = this.elements;
        if (popup) {
            popup.style.display = 'block';
            this.emit('shown');
        }
    }

    hide() {
        const { popup } = this.elements;
        if (popup) {
            popup.style.display = 'none';
            this.emit('hidden');
        }
    }

    setApiKey(apiKey) {
        this.options.apiKey = apiKey;
        this.emit('api-key-set', apiKey);
    }

    setTheme(theme) {
        this.options.theme = theme;
        this.applyTheme();
    }

    applyTheme() {
        const { popup } = this.elements;
        if (!popup) return;

        if (this.options.theme === 'dark') {
            popup.classList.add('dark-theme');
        } else {
            popup.classList.remove('dark-theme');
        }
    }

    clearHistory() {
        this.chatHistory = [];
        const { chatBody } = this.elements;
        if (chatBody) {
            chatBody.innerHTML = `
                <div class="message bot-message">
                    <div class="message-text" style="background: #f2f2ff; padding: 12px; border-radius: 12px; margin-bottom: 10px; max-width: 80%;">
                        대화 내역이 초기화되었습니다. 새로운 대화를 시작하세요!
                    </div>
                </div>
            `;
        }
        this.emit('history-cleared');
    }

    destroy() {
        const container = document.getElementById(this.options.container);
        if (container) {
            container.innerHTML = '';
        }
        this.isInitialized = false;
        this.emit('destroyed');
    }

    // 이벤트 시스템
    emit(eventName, data = null) {
        const event = new CustomEvent(`chatbot-${eventName}`, {
            detail: { instance: this, data }
        });
        document.dispatchEvent(event);
    }

    on(eventName, callback) {
        document.addEventListener(`chatbot-${eventName}`, (e) => {
            if (e.detail.instance === this) {
                callback(e.detail.data);
            }
        });
    }

    // 정적 메서드
    static createMultiple(configs) {
        return configs.map(config => new ChatbotModule(config));
    }

    static getVersion() {
        return '2.0.0';
    }
}

// 전역으로 사용 가능하게 만들기
if (typeof window !== 'undefined') {
    window.ChatbotModule = ChatbotModule;
}

// Node.js 환경 지원
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChatbotModule;
}

// 자동 초기화 (옵션)
document.addEventListener('DOMContentLoaded', () => {
    // data-chatbot 속성을 가진 요소가 있으면 자동 초기화
    const autoInitElements = document.querySelectorAll('[data-chatbot]');
    autoInitElements.forEach(element => {
        const options = {
            container: element.id || undefined
        };

        // data 속성들을 옵션으로 변환
        Object.keys(element.dataset).forEach(key => {
            if (key.startsWith('chatbot')) {
                const optionKey = key.replace('chatbot', '').toLowerCase();
                let value = element.dataset[key];

                // boolean 값 처리
                if (value === 'true') value = true;
                if (value === 'false') value = false;

                options[optionKey] = value;
            }
        });

        new ChatbotModule(options);
    });
});
