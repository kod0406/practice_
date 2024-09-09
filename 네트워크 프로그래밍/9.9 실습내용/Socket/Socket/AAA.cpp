#include  "common.h"

int main(int argc, char* argv[]) {

	//윈속 초기화
	WSADATA wsa;
	if (WSAStartup(MAKEWORD(2, 2), &wsa) != 0)
		return 1;
	printf("[알림]윈속 초기화 성공\n");
	printf("Suggested version: %d.%d\n", LOBYTE(wsa.wVersion), HIBYTE(wsa.wVersion));
	printf("Hight supported version:%d.%d\n", LOBYTE(wsa.wHighVersion), HIBYTE(wsa.wHighVersion));
	printf("szDescription: % s\n", wsa.szDescription);//윈속 설명
	printf("szSystem status: %s\n", wsa.szSystemStatus);//윈속 버전

	//소캣 생성
	SOCKET sock = socket(AF_INET, SOCK_STREAM, 0);
	if (sock == INVALID_SOCKET)
		err_quit("socket()");
	else
		printf("[알림]소켓 생성 성공\n");
	//소켓 닫기
	closesocket(sock);

	//윈속 종료
	WSACleanup();
	return 0;

	
}