#include <stdio.h>
#define MAXSIZE 3

int stack[MAXSIZE];
int top = -1;

int isfull() {
    return top == MAXSIZE - 1;
}

void push(int value) {
    if (isfull()) {
        printf("모두 찬 스택입니다.\n");
    }
    else {
        stack[++top] = value;
        printf("스택 첨자 %d에 %d 저장합니다. \n",top, value);
    }
}

int main() {
    push(3);
    push(5);
    push(9);
    push(1);
    return 0;
}