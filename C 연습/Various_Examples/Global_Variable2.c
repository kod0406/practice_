#include <stdio.h>

static int count = 0;

void static_global_increment() {
    count++;
    printf("정적 전역변수가 호출되었습니다. count = %d\n", count);
}
