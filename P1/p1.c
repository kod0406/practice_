#include<stdio.h>

int x;
int main(void)
{
	//extern int x = 10;
	//�̷��� �����ϸ鼭 �ʱ� ���� ������ �� ����.
	//���� ���� �����ϰ� ������ ���� �����Ͽ��� �Ѵ�.
	extern int x;
	x = 10;

	printf("%d\n", x);

	return 0;
}