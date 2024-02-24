#include <stdio.h>

int count = 0;

void global_increment() {
    count++;
    printf("전역변수가 호출되었습니다. count = %d\n", count);
}