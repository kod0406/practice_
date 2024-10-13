//#include "common.h"
//
//char* SERVERIP = (char*)"127.0.0.1";
//#define SERVERPORT 9000
//#define BUFSIZE    512
//
//int main(int argc, char* argv[])
//{
//    int retval;
//
//    // ����� �μ��� ������ IP �ּҷ� ���
//    if (argc > 1) SERVERIP = argv[1];
//
//    // ���� �ʱ�ȭ
//    WSADATA wsa;
//    if (WSAStartup(MAKEWORD(2, 2), &wsa) != 0)
//        return 1;
//
//    // ���� ����
//    SOCKET sock = socket(AF_INET, SOCK_STREAM, 0);
//    if (sock == INVALID_SOCKET) err_quit("socket()");
//
//    // connect()
//    struct sockaddr_in serveraddr;
//    memset(&serveraddr, 0, sizeof(serveraddr));
//    serveraddr.sin_family = AF_INET;
//    inet_pton(AF_INET, SERVERIP, &serveraddr.sin_addr);
//    serveraddr.sin_port = htons(SERVERPORT);
//    retval = connect(sock, (struct sockaddr*)&serveraddr, sizeof(serveraddr));
//    if (retval == SOCKET_ERROR) err_quit("connect()");
//
//    // ������ ��ſ� ����� ����
//    char buf[BUFSIZE + 1];
//    int len;
//
//    // ������ ������ ���
//    while (1) {
//        // �� ���� ���� �Է� �ޱ�
//        int num1, num2;
//        printf("\nù ��° ������ �Է��ϼ���: ");
//        scanf("%d", &num1);
//        printf("�Է��� ù ��° ����: %d\n", num1);
//
//        printf("�� ��° ������ �Է��ϼ���: ");
//        scanf("%d", &num2);
//        printf("�Է��� �� ��° ����: %d\n", num2);
//
//        // �Է¹��� �� ������ ���ڿ��� ��ȯ
//        sprintf(buf, "%d %d", num1, num2);
//
//        // ������ ������
//        retval = send(sock, buf, (int)strlen(buf), 0);
//        if (retval == SOCKET_ERROR) {
//            err_display("send()");
//            break;
//        }
//        printf("[TCP Ŭ���̾�Ʈ] %d����Ʈ�� ���½��ϴ�.\n", retval);
//
//        // ������ �ޱ�
//        retval = recv(sock, buf, BUFSIZE, 0);
//        if (retval == SOCKET_ERROR) {
//            err_display("recv()");
//            break;
//        }
//        else if (retval == 0)
//            break;
//
//        // ���� ������ ���
//        buf[retval] = '\0';
//        printf("[���� ������] �� ���� ��: %s\n", buf);
//    }
//
//    // ���� �ݱ�
//    closesocket(sock);
//
//    // ���� ����
//    WSACleanup();
//    return 0;
//}
