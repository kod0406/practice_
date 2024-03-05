#include<stdio.h>

int x;
int main(void)
{
	//extern int x = 10;
	//이렇게 선언하면서 초기 값을 지정할 수 없다.
	//따라서 먼저 선언하고 다음에 값을 지정하여야 한다.
	extern int x;
	x = 10;

	printf("%d\n", x);

	return 0;
}