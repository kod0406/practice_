//포트변호 Bind() 클라이언트 소스

//#include "common.h"
//
//char* SERVERIP = (char*)"127.0.0.1";
//#define SERVERPORT 9000
//#define BUFSIZE    512
//#define CLIENTPORT 50000
//
//int main(int argc, char* argv[])
//{
//	int retval;
//
//	// 명령행 인수가 있으면 IP 주소로 사용
//	if (argc > 1) SERVERIP = argv[1];
//
//	// 윈속 초기화
//	WSADATA wsa;
//	if (WSAStartup(MAKEWORD(2, 2), &wsa) != 0)
//		return 1;
//
//	// 소켓 생성
//	SOCKET sock = socket(AF_INET, SOCK_STREAM, 0);
//	if (sock == INVALID_SOCKET) err_quit("socket()");
//
//	//bind()
//	struct sockaddr_in clientaddr;
//	memset(&clientaddr, 0, sizeof(clientaddr));
//	clientaddr.sin_family = AF_INET;
//	clientaddr.sin_addr.s_addr = htonl(INADDR_ANY);
//	clientaddr.sin_port = htons(CLIENTPORT);
//	retval = bind(sock, (struct sockaddr*)&clientaddr, sizeof(clientaddr));
//	if (retval == SOCKET_ERROR) err_quit("bind()");
//
//	// connect()
//	struct sockaddr_in serveraddr;
//	memset(&serveraddr, 0, sizeof(serveraddr));
//	serveraddr.sin_family = AF_INET;
//	// serveraddr.sin_addr.s_addr = inet_addr(SERVERIP); // inet_addr 함수가 deprecated 되어 inet_pton 함수로 대체
//	inet_pton(AF_INET, SERVERIP, &serveraddr.sin_addr);
//	serveraddr.sin_port = htons(SERVERPORT);
//	retval = connect(sock, (struct sockaddr*)&serveraddr, sizeof(serveraddr));
//	if (retval == SOCKET_ERROR) err_quit("connect()");
//
//	// 데이터 통신에 사용할 변수
//	char buf[BUFSIZE + 1];
//	int len;
//
//	// 서버와 데이터 통신
//	while (1) {
//		// 데이터 입력
//		printf("\n[보낼 데이터] ");
//		if (fgets(buf, BUFSIZE + 1, stdin) == NULL)
//			break;
//
//		// '\n' 문자 제거
//		len = (int)strlen(buf);
//		if (buf[len - 1] == '\n')
//			buf[len - 1] = '\0';
//		if (strlen(buf) == 0)
//			break;
//
//		// 데이터 보내기
//		retval = send(sock, buf, (int)strlen(buf), 0);
//		if (retval == SOCKET_ERROR) {
//			err_display("send()");
//			break;
//		}
//		printf("[TCP 클라이언트] %d바이트를 보냈습니다.\n", retval);
//
//		// 데이터 받기
//		// retval = recvn(sock, buf, retval, 0); //기존 방법이 MSG_WAITALL 옵션으로 대체됨
//		retval = recv(sock, buf, retval, MSG_WAITALL);
//		if (retval == SOCKET_ERROR) {
//			err_display("recv()");
//			break;
//		}
//		else if (retval == 0) //바이트가 0(엔터키만)이면 종료
//			break;
//
//		// 받은 데이터 출력
//		buf[retval] = '\0';
//		printf("[TCP 클라이언트] %d바이트를 받았습니다.\n", retval);
//		printf("[받은 데이터] %s\n", buf);
//	}
//
//	// 소켓 닫기
//	closesocket(sock);
//
//	// 윈속 종료
//	WSACleanup();
//	return 0;
//}