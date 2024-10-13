//#include "common.h"
//
//#define SERVERPORT 9000
//#define BUFSIZE    512
//
//int main(int argc, char* argv[])
//{
//    int retval;
//
//    // 윈속 초기화
//    WSADATA wsa;
//    if (WSAStartup(MAKEWORD(2, 2), &wsa) != 0)
//        return 1;
//
//    // 소켓 생성
//    SOCKET listen_sock = socket(AF_INET, SOCK_STREAM, 0);
//    if (listen_sock == INVALID_SOCKET) err_quit("socket()");
//
//    // bind()
//    struct sockaddr_in serveraddr;
//    memset(&serveraddr, 0, sizeof(serveraddr));
//    serveraddr.sin_family = AF_INET;
//    serveraddr.sin_addr.s_addr = htonl(INADDR_ANY);
//    serveraddr.sin_port = htons(SERVERPORT);
//    retval = bind(listen_sock, (struct sockaddr*)&serveraddr, sizeof(serveraddr));
//    if (retval == SOCKET_ERROR) err_quit("bind()");
//
//    // listen()
//    retval = listen(listen_sock, SOMAXCONN);
//    if (retval == SOCKET_ERROR) err_quit("listen()");
//
//    SOCKET client_sock;
//    struct sockaddr_in clientaddr;
//    int addrlen;
//    char buf[BUFSIZE + 1];
//
//    while (1) {
//        // accept()
//        addrlen = sizeof(clientaddr);
//        client_sock = accept(listen_sock, (struct sockaddr*)&clientaddr, &addrlen);
//        if (client_sock == INVALID_SOCKET) {
//            err_display("accept()");
//            break;
//        }
//
//        // 접속한 클라이언트 정보 출력
//        char addr[INET_ADDRSTRLEN];
//        inet_ntop(AF_INET, &clientaddr.sin_addr, addr, sizeof(addr));
//        printf("\n[TCP 서버] 클라이언트 접속: IP 주소=%s, 포트 번호=%d\n",
//            addr, ntohs(clientaddr.sin_port));
//
//        // 클라이언트와 데이터 통신
//        while (1) {
//            // 데이터 받기
//            retval = recv(client_sock, buf, BUFSIZE, 0);
//            if (retval == SOCKET_ERROR) {
//                err_display("recv()");
//                break;
//            }
//            else if (retval == 0)
//                break;
//
//            // 받은 데이터 처리
//            buf[retval] = '\0';
//            printf("[TCP/%s:%d] 받은 데이터: %s\n", addr, ntohs(clientaddr.sin_port), buf);
//
//            // 문자열에서 두 개의 정수를 추출
//            int num1, num2;
//            sscanf(buf, "%d %d", &num1, &num2);
//
//            // 두 수의 합 계산
//            int sum = num1 + num2;
//            printf("[TCP 서버] 받은 숫자: %d, %d 합계: %d\n", num1, num2, sum);
//
//            // 합계를 클라이언트로 보내기
//            sprintf(buf, "%d", sum);
//            retval = send(client_sock, buf, (int)strlen(buf), 0);
//            if (retval == SOCKET_ERROR) {
//                err_display("send()");
//                break;
//            }
//        }
//
//        // 소켓 닫기
//        closesocket(client_sock);
//        printf("[TCP 서버] 클라이언트 종료: IP 주소=%s, 포트 번호=%d\n",
//            addr, ntohs(clientaddr.sin_port));
//    }
//
//    // 소켓 닫기
//    closesocket(listen_sock);
//
//    // 윈속 종료
//    WSACleanup();
//    return 0;
//}
