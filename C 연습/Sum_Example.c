#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

int sum(int n) {
    static int cnt = 0;
    cnt++;
    printf("%d번 호출\n", cnt);

    if (n == 1) {
        return 1;
    }
    else {
        return n + sum(n - 1);
    }
}

int main() {
    int n;
    printf("양의 정수를 입력 >> ");
    scanf("%d", &n);

    int result = sum(n);
    printf("sum=%d\n", result);

    return 0;
}
