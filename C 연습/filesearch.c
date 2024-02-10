#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

int main(int argc, char* argv[]) {

    if (argc < 2) {
        printf("사용법: prg07 file\n");
        printf("또는: prg07 oldfile newfile\n");
        return 1;
    }

    const char* file = argv[1];


    if (argc == 2) {
        if (remove(file) == 0) {
            printf("파일이 삭제되었습니다.\n");
        }
        else {
            printf("파일을 삭제할 수 없습니다.\n");
        }
    }

    else if (argc == 3) {
        const char* newfile = argv[2];
        if (rename(file, newfile) == 0) {
            printf("파일 이름이 변경되었습니다.\n");
        }
        else {
            printf("파일 이름을 변경할 수 없습니다.\n");
        }
    }
    else {
        printf("잘못된 명령행 인자입니다.\n");
        return 1;
    }

    return 0;
}
