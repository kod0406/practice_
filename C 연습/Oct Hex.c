#include <stdio.h>

int main() {
    int N; // 훈련장 크기
    int x = 1, y = 1; // 초기 위치 (1,1)
    char swing[51]; // 스윙 기록
    int i = 0; // 스윙 기록 인덱스

    // 훈련장 크기 입력
    scanf("%d", &N);
    if (N < 1 || N > 50) {
        printf("훈련장 크기는 1 이상 50 이하의 정수여야 합니다.\n");
        return 1;
    }

    // 스윙 기록 입력
    scanf("%s", swing);

    // 스윙 기록에 따라 공의 위치 업데이트
    while (swing[i] != '\0') {
        char move = swing[i];
        switch (move) {
        case 'U':
            if (x > 1) x--;
            break;
        case 'D':
            if (x < N) x++;
            break;
        case 'L':
            if (y > 1) y--;
            break;
        case 'R':
            if (y < N) y++;
            break;
        }
        i++;
    }

    // 공의 마지막 위치 출력
    printf("공 마지막 위치: (%d, %d)\n", x, y);

    return 0;
}
