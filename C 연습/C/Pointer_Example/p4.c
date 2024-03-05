#include <stdio.h>

int main() {
	int value = 0x000000FF;
	int* pi = &value;
	printf("%d",value);
	short* ps = (short*)&value;
	*(ps + 1) = 0x000F;
	printf("\n%d %d", *ps,*(ps + 1));
}
