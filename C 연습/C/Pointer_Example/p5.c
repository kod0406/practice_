#include <stdio.h>

int main() {
	int arr[3][4] = {
		{11,22,33,44},
		{55,66,77,88},
		{11,66,77,44}
	};
	int i, j;
	int(*p)[4] = arr;
	for (i = 0; i < 3; i++) {
		for (j = 0; j < 4; j++) {
			printf("arr[%d][%d] = %d ", i, j, (*p+i)[j]);
		}
		printf("\n");
	}
}

