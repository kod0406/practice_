#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

int main() {
	double input;
	int* ptr = (int*)&input;
	scanf("%d %d",ptr,ptr+1);
	printf("%d %d %d", *ptr, *(ptr + 1), (*ptr + *(ptr + 1)));
}


