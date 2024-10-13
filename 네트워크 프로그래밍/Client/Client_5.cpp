//가변길이 통신 클라이언트 코드
#include "common.h"

char* SERVERIP = (char*)"127.0.0.1";
#define SERVERPORT 9000
#define BUFSIZE    50

int main(int argc, char* argv[])
{
	int retval;

	// 명령행 인수가 있으면 IP 주소로 사용
	if (argc > 1) SERVERIP = argv[1];

	// 윈속 초기화
	WSADATA wsa;
	if (WSAStartup(MAKEWORD(2, 2), &wsa) != 0)
		return 1;

	// 소켓 생성
	SOCKET sock = socket(AF_INET, SOCK_STREAM, 0);
	if (sock == INVALID_SOCKET) err_quit("socket()");

	// connect()
	struct sockaddr_in serveraddr;
	memset(&serveraddr, 0, sizeof(serveraddr));
	serveraddr.sin_family = AF_INET;
	// serveraddr.sin_addr.s_addr = inet_addr(SERVERIP); // inet_addr 함수가 deprecated 되어 inet_pton 함수로 대체
	inet_pton(AF_INET, SERVERIP, &serveraddr.sin_addr);
	serveraddr.sin_port = htons(SERVERPORT);
	retval = connect(sock, (struct sockaddr*)&serveraddr, sizeof(serveraddr));
	if (retval == SOCKET_ERROR) err_quit("connect()");

	// 데이터 통신에 사용할 변수
	char buf[BUFSIZE];
	const char* testdata[] = {
		"안녕하세요",
		"반기워요",
		"오늘따라 할 이야기가 많을 것 같네요",
		"저도 그렇네요",
	};
	int len;
	//서버와 데이터 통신
	for (int i = 0; i < 4; i++) {
		//데이터 입력(시뮬레이션)
		len = (int)strlen(testdata[i]);
		strncpy(buf, testdata[i],len);
		//데이터 보내기
		retval = send(sock, buf, len,0);
		if (retval == SOCKET_ERROR) {
			err_display("send()");
			break;
		}
		printf("[TCP 클라이언트] %d바이트를 보냈습니다.\n", retval);
	}
	closesocket(sock);
	WSACleanup();
	return 0;
	
}
//해당 코드에서 EOR는 어디에 있지?
//해당 코드에서 EOR은 없다. 왜냐하면 데이터의 길이를 보내기 때문에 EOR이 필요없다.