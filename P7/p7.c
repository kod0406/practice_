#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int number;
static int min = 1;
static int max = 100;

void setNumber() {
    srand(time(NULL));
    number = rand() % 100 + 1;
}

void printHead() {
    printf("1에서 100까지의 하나의 정수가 결정되었습니다.\n이 정수를 맞추어 보세요? > ");
}

void printHigher() {
    printf("맞추어야 할 정수가 입력한 정수보다 작습니다.\n%d에서 %d사이의 정수를 다시 입력하세요. > ", min, max);
}

void printLower() {
    printf("맞추어야 할 정수가 입력한 정수보다 큽니다.\n%d에서 %d사이의 정수를 다시 입력하세요. > ", min, max);
}

void printAnswer() {
    printf("축하합니다! 정답은 %d입니다.\n", number);
}

int main() {
    setNumber();
    int guess = 0;
    printHead();
    do {
        scanf("%d", &guess);
        if (guess > number) {
            max = guess - 1;
            printHigher();
        }
        else if (guess < number) {
            min = guess + 1;
            printLower();
        }
        else {
            printAnswer();
        }
    } while (guess != number);

    return 0;
}

