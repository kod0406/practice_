#include <stdio.h>
#define MAXSIZE 3

int stack[MAXSIZE];
int top = -1;

int isfull() {
    return top == MAXSIZE - 1;
}

void push(int value) {
    if (isfull()) {
        printf("��� �� �����Դϴ�.\n");
    }
    else {
        stack[++top] = value;
        printf("���� ÷�� %d�� %d �����մϴ�. \n",top, value);
    }
}

int main() {
    push(3);
    push(5);
    push(9);
    push(1);
    return 0;
}