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
    printf("1���� 100������ �ϳ��� ������ �����Ǿ����ϴ�.\n�� ������ ���߾� ������? > ");
}

void printHigher() {
    printf("���߾�� �� ������ �Է��� �������� �۽��ϴ�.\n%d���� %d������ ������ �ٽ� �Է��ϼ���. > ", min, max);
}

void printLower() {
    printf("���߾�� �� ������ �Է��� �������� Ů�ϴ�.\n%d���� %d������ ������ �ٽ� �Է��ϼ���. > ", min, max);
}

void printAnswer() {
    printf("�����մϴ�! ������ %d�Դϴ�.\n", number);
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

