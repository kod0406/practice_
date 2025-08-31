# 🤖 ChatbotModule v2.0 - 범용 웹 챗봇 모듈

어떤 HTML 페이지에서도 쉽게 사용할 수 있는 독립적인 챗봇 모듈입니다. Google Gemini API를 활용하여 대화형 AI 챗봇을 구현할 수 있습니다.

## ✨ 주요 특징

- 🚀 **완전 독립적**: 어떤 웹사이트든 3줄의 코드로 추가 가능
- 🎨 **다중 인스턴스 지원**: 한 페이지에 여러 챗봇 동시 사용 가능
- 📱 **반응형 디자인**: 모바일/데스크톱 모두 지원
- 🌙 **테마 지원**: 라이트/다크 모드 지원
- 📎 **파일 업로드**: 이미지 및 문서 첨부 가능
- 🎯 **위치 커스터마이징**: 4개 모서리 어디든 배치 가능
- ⚡ **자동 초기화**: HTML 속성만으로 설정 가능
- 🎪 **이벤트 시스템**: 챗봇 상태 변화를 감지하고 대응 가능
- 💾 **폴백 지원**: CSS/HTML 파일이 없어도 기본 UI로 동작

## 📁 파일 구조

```
module/
├── chatbot-module.js     # 메인 챗봇 모듈
├── chatbot.css          # 챗봇 스타일시트
└── chatbot_layout.html  # 챗봇 HTML 레이아웃
```

## 🚀 빠른 시작

### 방법 1: 기본 사용법 (가장 간단)

```html
<!DOCTYPE html>
<html>
<head>
    <title>내 웹사이트</title>
    <!-- 필요한 폰트 (선택사항) -->
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet">
</head>
<body>
    <!-- 기존 웹사이트 내용 -->
    <h1>내 웹사이트입니다</h1>
    
    <!-- 챗봇 컨테이너 -->
    <div id="chatbot-container"></div>
    
    <!-- 챗봇 모듈 로드 -->
    <script src="path/to/chatbot-module.js"></script>
    <script>
        // 챗봇 생성
        const chatbot = new ChatbotModule({
            apiKey: 'YOUR_GOOGLE_GEMINI_API_KEY',
            position: 'bottom-right'
        });
    </script>
</body>
</html>
```

### 방법 2: HTML 속성으로 자동 초기화

```html
<!DOCTYPE html>
<html>
<head>
    <title>자동 초기화 예제</title>
</head>
<body>
    <!-- 자동으로 초기화되는 챗봇 -->
    <div id="my-chatbot" 
         data-chatbot
         data-chatbotkey="YOUR_API_KEY"
         data-chatbotposition="bottom-left">
    </div>
    
    <!-- 스크립트만 포함하면 자동으로 초기화됨 -->
    <script src="path/to/chatbot-module.js"></script>
</body>
</html>
```

### 방법 3: 고급 설정

```javascript
const chatbot = new ChatbotModule({
    apiKey: 'your-gemini-api-key',
    position: 'bottom-right',
    theme: 'dark',
    container: 'my-custom-container',
    layoutPath: './custom-layout.html',
    cssPath: './custom-styles.css',
    enableFileUpload: true,
    enableEmoji: true,
    maxFileSize: 10 * 1024 * 1024, // 10MB
});

// 이벤트 리스너 등록
chatbot.on('initialized', () => {
    console.log('챗봇이 초기화되었습니다!');
});

chatbot.on('message-sent', (data) => {
    console.log('메시지 전송:', data.message);
    console.log('봇 응답:', data.response);
});
```

## ⚙️ 설정 옵션

| 옵션 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `apiKey` | string | null | Google Gemini API 키 |
| `position` | string | 'bottom-right' | 챗봇 위치 ('bottom-left', 'bottom-right', 'top-left', 'top-right') |
| `container` | string | 'chatbot-container' | 챗봇이 삽입될 컨테이너 ID |
| `theme` | string | 'light' | 테마 ('light', 'dark') |
| `layoutPath` | string | './chatbot_layout.html' | 커스텀 HTML 레이아웃 경로 |
| `cssPath` | string | './chatbot.css' | 커스텀 CSS 파일 경로 |
| `enableFileUpload` | boolean | true | 파일 업로드 기능 활성화 |
| `enableEmoji` | boolean | true | 이모지 기능 활성화 |
| `maxFileSize` | number | 5MB | 최대 파일 크기 (바이트) |
| `autoInit` | boolean | true | 자동 초기화 여부 |

## 🎯 실제 사용 예시

### 예시 1: 고객 지원 챗봇

```html
<!-- 고객 지원 페이지 -->
<!DOCTYPE html>
<html>
<head>
    <title>고객 지원</title>
    <link rel="stylesheet" href="path/to/chatbot.css">
</head>
<body>
    <h1>고객 지원 센터</h1>
    <p>궁금한 점이 있으시면 우측 하단의 챗봇을 이용해주세요!</p>
    
    <div id="support-chatbot"></div>
    
    <script src="path/to/chatbot-module.js"></script>
    <script>
        const supportBot = new ChatbotModule({
            apiKey: 'YOUR_API_KEY',
            container: 'support-chatbot',
            position: 'bottom-right',
            theme: 'light'
        });
        
        // 고객 지원 전용 메시지 처리
        supportBot.on('message-sent', (data) => {
            // 고객 문의 로그 저장
            console.log('고객 문의:', data.message);
        });
    </script>
</body>
</html>
```

### 예시 2: 다중 챗봇 (다른 용도)

```html
<!DOCTYPE html>
<html>
<head>
    <title>다중 챗봇 예제</title>
</head>
<body>
    <!-- 일반 도우미 챗봇 -->
    <div id="helper-bot" data-chatbot data-chatbotposition="bottom-left"></div>
    
    <!-- 기술 지원 챗봇 -->
    <div id="tech-bot" data-chatbot data-chatbotposition="bottom-right"></div>
    
    <script src="path/to/chatbot-module.js"></script>
    <script>
        // 페이지 로드 후 추가 설정
        document.addEventListener('DOMContentLoaded', () => {
            // 일반 도우미는 파일 업로드 비활성화
            const helperBot = new ChatbotModule({
                container: 'helper-bot',
                enableFileUpload: false,
                theme: 'light'
            });
            
            // 기술 지원은 파일 업로드 허용
            const techBot = new ChatbotModule({
                container: 'tech-bot',
                enableFileUpload: true,
                maxFileSize: 10 * 1024 * 1024,
                theme: 'dark'
            });
        });
    </script>
</body>
</html>
```

### 예시 3: 기존 웹사이트에 통합

```html
<!-- 기존 WordPress/React/Vue 등 어떤 사이트든 적용 가능 -->
<script>
// 기존 사이트의 스크립트 어디서든 사용 가능
window.addEventListener('load', () => {
    const chatbot = new ChatbotModule({
        apiKey: process.env.GEMINI_API_KEY, // 환경변수 사용
        position: 'bottom-right',
        container: 'chatbot-area'
    });
    
    // 사용자 로그인 상태에 따른 개인화
    if (window.userLoggedIn) {
        chatbot.on('initialized', () => {
            chatbot.addMessage(`안녕하세요 ${window.userName}님!`, 'bot');
        });
    }
});
</script>
```

## 🔧 고급 사용법

### API 키 동적 설정

```javascript
const chatbot = new ChatbotModule({
    position: 'bottom-right'
    // API 키 없이 초기화
});

// 나중에 사용자가 API 키 입력
function setUserApiKey() {
    const apiKey = prompt('API 키를 입력하세요:');
    chatbot.setApiKey(apiKey);
}
```

### 커스텀 이벤트 처리

```javascript
const chatbot = new ChatbotModule({
    apiKey: 'your-key',
});

// 다양한 이벤트 처리
chatbot.on('initialized', () => console.log('초기화 완료'));
chatbot.on('shown', () => console.log('챗봇 열림'));
chatbot.on('hidden', () => console.log('챗봇 닫힘'));
chatbot.on('message-sent', (data) => {
    console.log('새 메시지:', data.message);
    // 분석 도구에 전송
    analytics.track('chatbot_message', data);
});
chatbot.on('error', (error) => {
    console.error('챗봇 오류:', error);
    // 오류 로깅 서비스에 전송
});
```

### 프로그래매틱 제어

```javascript
const chatbot = new ChatbotModule({
    apiKey: 'your-key',
    autoInit: false // 수동 초기화
});

// 수동으로 초기화
chatbot.init().then(() => {
    console.log('챗봇 준비 완료');
    
    // 프로그래매틱 제어
    chatbot.show();           // 챗봇 열기
    chatbot.hide();           // 챗봇 닫기
    chatbot.setTheme('dark'); // 테마 변경
    chatbot.clearHistory();   // 대화 기록 초기화
});

// 다중 챗봇 생성 (정적 메서드 사용)
const bots = ChatbotModule.createMultiple([
    { position: 'bottom-left', theme: 'light' },
    { position: 'bottom-right', theme: 'dark' },
    { position: 'top-right', theme: 'light' }
]);
```

## 🎨 커스터마이징

### CSS 커스터마이징

```css
/* 챗봇 버튼 색상 변경 */
#chatbot-toggle {
    background: #ff6b6b !important;
}

#chatbot-toggle:hover {
    background: #ff5252 !important;
}

/* 메시지 버블 색상 변경 */
.user-message .message-text {
    background: #4caf50 !important;
}

/* 다크 테마 커스터마이징 */
.chatbot-popup.dark-theme {
    background: #1a1a1a !important;
}

.chatbot-popup.dark-theme .chat-header {
    background: #333 !important;
}
```

### HTML 레이아웃 커스터마이징

```html
<!-- 커스텀 레이아웃 파일 -->
<button id="chatbot-toggle" class="my-custom-button">
    <span>💬</span>
</button>

<div class="chatbot-popup my-custom-popup">
    <div class="chat-header">
        <h2>내 회사 AI 도우미</h2>
        <button id="close-chatbot">×</button>
    </div>
    
    <div class="chat-body">
        <!-- 커스텀 환영 메시지 -->
        <div class="message bot-message">
            <div class="message-text">
                안녕하세요! 저는 회사의 AI 도우미입니다. 
                무엇을 도와드릴까요? 😊
            </div>
        </div>
    </div>
    
    <div class="chat-footer">
        <!-- 커스텀 입력 폼 -->
        <form class="chat-form">
            <textarea class="message-input" placeholder="궁금한 것을 물어보세요..."></textarea>
            <button type="submit" id="send-message">전송</button>
        </form>
    </div>
</div>
```

## 🛠️ 개발자 가이드

### 빌드 및 배포

```bash
# 개발 환경
npm install
npm run dev

# 프로덕션 빌드
npm run build

# 테스트
npm test
```

### 환경별 설정

```javascript
// 개발 환경
const chatbot = new ChatbotModule({
    apiKey: 'dev-api-key',
    layoutPath: './dev/chatbot_layout.html',
    cssPath: './dev/chatbot.css'
});

// 프로덕션 환경
const chatbot = new ChatbotModule({
    apiKey: process.env.PROD_GEMINI_API_KEY,
    layoutPath: 'https://cdn.mysite.com/chatbot_layout.html',
    cssPath: 'https://cdn.mysite.com/chatbot.css'
});
```

## ❗ 주의사항

1. **API 키 보안**: 클라이언트 사이드에 API 키를 노출하지 마세요. 서버에서 프록시 API를 만들어 사용하는 것을 권장합니다.

```javascript
// ❌ 보안에 취약
const chatbot = new ChatbotModule({
    apiKey: 'AIzaSyD5YDa9M6Rxq67yLsg8WCaiyUZFSJsTTEE' // 노출됨
});

// ✅ 권장 방법
const chatbot = new ChatbotModule({
    // API 키 없이 생성하고 서버 API 사용
    customApiEndpoint: '/api/chat' // 자체 백엔드 API 사용
});
```

2. **파일 크기 제한**: 큰 파일 업로드 시 브라우저 성능에 영향을 줄 수 있습니다.

3. **다중 인스턴스**: 너무 많은 챗봇 인스턴스는 메모리 사용량을 증가시킵니다.

## 🐛 문제 해결

### 자주 발생하는 문제들

**Q: 챗봇 버튼이 보이지 않아요**
```javascript
// 초기화 상태 확인
console.log(chatbot.isInitialized);

// 수동 초기화 시도
chatbot.init();
```

**Q: API 호출이 실패해요**
```javascript
// 에러 이벤트 리스너로 디버깅
chatbot.on('error', (error) => {
    console.error('상세 오류:', error);
});
```

**Q: CSS가 적용되지 않아요**
```javascript
// 폴백 CSS 사용
const chatbot = new ChatbotModule({
    cssPath: null // null로 설정하면 인라인 스타일 사용
});
```

**Q: 모바일에서 레이아웃이 깨져요**
```css
/* 반응형 CSS 추가 */
@media (max-width: 768px) {
    .chatbot-popup {
        width: 90vw !important;
        left: 5vw !important;
        right: 5vw !important;
    }
}
```

## 📚 추가 리소스

- [Google Gemini API 문서](https://ai.google.dev/docs)
- [Material Symbols 아이콘](https://fonts.google.com/icons)
- [MDN Web APIs](https://developer.mozilla.org/docs/Web/API)

## 📄 라이선스

MIT License - 자유롭게 사용, 수정, 배포 가능합니다.

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

**버전**: 2.0.0  
**최종 업데이트**: 2025.08.31  
**지원**: [GitHub Issues](https://github.com/your-repo/issues)

> 💡 **팁**: 이 모듈을 사용하여 고객 지원, 교육, 게임, 쇼핑몰 등 다양한 용도의 챗봇을 만들 수 있습니다!
