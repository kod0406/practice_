#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

int main(int argc, char* argv[]) {

    if (argc < 2) {
        printf("����: prg07 file\n");
        printf("�Ǵ�: prg07 oldfile newfile\n");
        return 1;
    }

    const char* file = argv[1];


    if (argc == 2) {
        if (remove(file) == 0) {
            printf("������ �����Ǿ����ϴ�.\n");
        }
        else {
            printf("������ ������ �� �����ϴ�.\n");
        }
    }

    else if (argc == 3) {
        const char* newfile = argv[2];
        if (rename(file, newfile) == 0) {
            printf("���� �̸��� ����Ǿ����ϴ�.\n");
        }
        else {
            printf("���� �̸��� ������ �� �����ϴ�.\n");
        }
    }
    else {
        printf("�߸��� ����� �����Դϴ�.\n");
        return 1;
    }

    return 0;
}
