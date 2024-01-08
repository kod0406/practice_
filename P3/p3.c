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
        printf("모두 찬 스택입니다.\n");
    }
    else {
        stack[++top] = value;
        printf("스택 첨자 %d에 %d 저장합니다. \n", top, value);
    }
}

int pop() {
    if (isempty()) {
        printf("스택이 비어있습니다.\n");
        return -1;
    }
    else {
        int value = stack[top--];
        printf("스택 첨자 %d에서 %d 제거합니다. \n", top + 1, value);
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
