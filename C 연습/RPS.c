#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main() {
    int user_choice, system_choice;
    const char* options[] = { "����", "����", "��" };

    srand(time(NULL)); // ���� ������ �ʱ�ȭ
    system_choice = rand() % 3; // 0, 1, 2 �߿��� �ϳ� ����

    printf("����(0) ����(1) ��(2) �߿��� �ϳ� �Է� �� ");
    scanf("%d", &user_choice);

    printf("����� %s�̰�, �ý����� %s�Դϴ�.\n", options[user_choice], options[system_choice]);

    if (user_choice == system_choice) {
        printf("�����ϴ�.\n");
    }
    else if ((user_choice == 0 && system_choice == 2) ||
        (user_choice == 1 && system_choice == 0) ||
        (user_choice == 2 && system_choice == 1)) {
        printf("����� �¸��Դϴ�.\n");
    }
    else {
        printf("��ǻ���� �¸��Դϴ�.\n");
    }

    return 0;
}
