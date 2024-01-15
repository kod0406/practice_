#include <stdio.h>

int main() {
	double a[] = { 5.3, 2.1, 8.7, 1.6, 4.9 };
	int size = sizeof(a) / sizeof(a[0]);
	double* p = a;
	double min = *p;
	int index;
	for (int i = 0; i < size; i++) {
		if (*(p + i) < min) {
			min = *(p + i);
			index = i;
		}
	}
	printf("최소 값, 첨자: %d 최소값: %.2lf, \n", index, min);
}