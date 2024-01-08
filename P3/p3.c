#include <stdio.h>
#define MAXSIZE 3

int stack[MAXSIZE];
int top = -1;

int isfull() {
    return top == MAXSIZE - 1;
}

int isempty() {
    return top == -1;
}

void push(int value) {
    if (isfull()) {
        printf("��� �� �����Դϴ�.\n");
    }
    else {
        stack[++top] = value;
        printf("���� ÷�� %d�� %d �����մϴ�. \n", top, value);
    }
}

int pop() {
    if (isempty()) {
        printf("������ ����ֽ��ϴ�.\n");
        return -1;
    }
    else {
        int value = stack[top--];
        printf("���� ÷�� %d���� %d �����մϴ�. \n", top + 1, value);
        return value;
    }
}

int main() {
    push(3);
    push(5);
    pop();
    push(9);
    push(1);
    push(7);
    return 0;
}
