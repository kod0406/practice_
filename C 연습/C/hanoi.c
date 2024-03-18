/*
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

void phanoi(int n, char s, char e) {
    printf("%d를 %c에서 %c로 이동\n", n, s, e);
}

void hanoi(int n, char s, char e, char m) {
    if (n == 1) {
        phanoi(n, s, e);
    } else {
        hanoi(n - 1, s, m, e);
        phanoi(n, s, e);
        hanoi(n - 1, m, e, s);
    }
}

int main() {
    int n = 3;
    char s = 'A';
    char e = 'C';
    char m = 'B';

    hanoi(n, s, e, m);
    return 0;
}*/
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>



#include <stdio.h>

void main() {
    int input = 0;
    int input2 = 0;
    double r = 1.0;
    scanf("%d", &input);
    scanf("%d", &input2);
    for (int i = 0; i < input2; i++) {
        r *= input;
    }
    printf("%f", r);
}
/*
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

int power(int x, int n) {
    if (n == 0) {
        return 1;
    } else {
        if (n % 2 == 0) {
            return power(x * x, n / 2);
        } else {
            return x * power(x * x, (n - 1) / 2);
        }
    }
}

int main() {
    int n = 2;
    int x = 10;
    int y = 11;

    int result_x = power(n, x);
    int result_y = power(n, y);

    printf("n^%d = %d\n", x, result_x);
    printf("n^%d = %d\n", y, result_y);

    return 0;
}
*/