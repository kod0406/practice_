#include "common.h"
int main(int argc, char* argv[]) {
	WSADATA wsa;
	if(WSAStartup(MAKEWORD(2, 2), &wsa) != 0)
		return 1;
	printf("[�˸�]���� �ʱ�ȭ ����\n");
	//��Ĺ ����
	SOCKET sock = socket(AF_INET, SOCK_STREAM, 0);
	if(sock == INVALID_SOCKET)
		err_quit("socket()");
	else
		printf("[�˸�]���� ���� ����\n");
	//���� �ݱ�
	closesocket(sock);

	//���� ����
	WSACleanup();
	return 0;
}