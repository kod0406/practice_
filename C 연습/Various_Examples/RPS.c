#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main() {
    int user_choice, system_choice;
    const char* options[] = { "가위", "바위", "보" };

    srand(time(NULL)); // 난수 생성기 초기화
    system_choice = rand() % 3; // 0, 1, 2 중에서 하나 선택

    printf("가위(0) 바위(1) 보(2) 중에서 하나 입력 → ");
    scanf("%d", &user_choice);

    printf("당신은 %s이고, 시스템은 %s입니다.\n", options[user_choice], options[system_choice]);

    if (user_choice == system_choice) {
        printf("비겼습니다.\n");
    }
    else if ((user_choice == 0 && system_choice == 2) ||
        (user_choice == 1 && system_choice == 0) ||
        (user_choice == 2 && system_choice == 1)) {
        printf("당신의 승리입니다.\n");
    }
    else {
        printf("컴퓨터의 승리입니다.\n");
    }

    return 0;
}
