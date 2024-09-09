#include  "common.h"

int main(int argc, char* argv[]) {

	//���� �ʱ�ȭ
	WSADATA wsa;
	if (WSAStartup(MAKEWORD(2, 2), &wsa) != 0)
		return 1;
	printf("[�˸�]���� �ʱ�ȭ ����\n");
	printf("Suggested version: %d.%d\n", LOBYTE(wsa.wVersion), HIBYTE(wsa.wVersion));
	printf("Hight supported version:%d.%d\n", LOBYTE(wsa.wHighVersion), HIBYTE(wsa.wHighVersion));
	printf("szDescription: % s\n", wsa.szDescription);//���� ����
	printf("szSystem status: %s\n", wsa.szSystemStatus);//���� ����

	//��Ĺ ����
	SOCKET sock = socket(AF_INET, SOCK_STREAM, 0);
	if (sock == INVALID_SOCKET)
		err_quit("socket()");
	else
		printf("[�˸�]���� ���� ����\n");
	//���� �ݱ�
	closesocket(sock);

	//���� ����
	WSACleanup();
	return 0;

	
}