#include "common.h"
int main(int argc, char* argv[]) {
	WSADATA wsa;
	if(WSAStartup(MAKEWORD(2, 2), &wsa) != 0)
		return 1;
	printf("[알림]윈속 초기화 성공\n");
	//소캣 생성
	SOCKET sock = socket(AF_INET, SOCK_STREAM, 0);
	if(sock == INVALID_SOCKET)
		err_quit("socket()");
	else
		printf("[알림]소켓 생성 성공\n");
	//소켓 닫기
	closesocket(sock);

	//윈속 종료
	WSACleanup();
	return 0;
}