#include <stdio.h>

static int count = 0;

void static_global_increment() {
    count++;
    printf("���� ���������� ȣ��Ǿ����ϴ�. count = %d\n", count);
}
