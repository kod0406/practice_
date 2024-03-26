#include <stdio.h>
void printArray(int Arr[], int n) {
	for (int i = 0; i < n; i++) {
		printf("%d ", Arr[i]);
		if(i % 3 == 2) {
			printf("\n");
		}
	}
	printf("\n");
}
void printArray_Address(int* Arr, int n) {
	for (int i = 0; i < n; i++) {
		printf("%d ",*(Arr +i));
		if(i % 3 == 2) {
			printf("\n");
		}
	}
}// *(Arr + i) == Arr 배열의 i번째 원소에 접근

void main() {
	int Arr2 [][3] = {
    {30, 20, 10},
    {60, 50, 40},
    {90, 80, 70}
    };
	printArray(Arr2, 9);

	printArray_Address(Arr2, 9);
	printf("\n");

    int i,j,k,l, tmp;
	for (i = 0; i < 3; i++) {
		for (j = 0; j < 3; j++) {
			l = i + 1;
			for (k = i; k < 3; k++) {
				while (l < 3) {
					if (Arr2[i][j] > Arr2[k][l]) {
						tmp = Arr2[i][j];
						Arr2[i][j] = Arr2[k][l];
						Arr2[k][l] = tmp;
					}
					l++;
				}
				l = 0;
			}
		}
	}
	printArray(Arr2, 9);
	
	int Arr3[][3] = {
	{30, 20, 10},
	{60, 50, 40},
	{90, 80, 70}
	};

	for (i = 0; i < 3; i++) {
		for (j = 0; j < 3; j++) {
			for (k = 0; k < 3; k++) {
				for (l = 0; l < 3; l++) {
					if (Arr3[i][j] < Arr3[k][l]) {
						tmp = Arr3[i][j];
						Arr3[i][j] = Arr3[k][l];
						Arr3[k][l] = tmp;
					}
				}
			}
		}
	}
	// 이 친구의 인덱스 변화는 00 01, 00 02, 01 00, 01 01, 01 02, 02 00, 02 01, 02 02

	printArray(Arr3, 9);

}
//void bubbleSort2D(int arr[][3], int rows, int cols) {
//	int temp;
//	for (int i = 0; i < rows - 1; i++) {
//		for (int j = 0; j < cols - 1; j++) {
//			for (int k = 0; k < rows - i - 1; k++) {
//				for (int l = 0; l < cols - j - 1; l++) {
//					// 인접한 원소와 비교하여 교환
//					if (arr[k][l] > arr[k][l + 1]) {
//						temp = arr[k][l];
//						arr[k][l] = arr[k][l + 1];
//						arr[k][l + 1] = temp;
//					}
//				}
//				// 행의 마지막 원소와 다음 행의 첫 원소를 비교하여 교환
//				if (k < rows - 1 && arr[k][cols - 1] > arr[k + 1][0]) {
//					temp = arr[k][cols - 1];
//					arr[k][cols - 1] = arr[k + 1][0];
//					arr[k + 1][0] = temp;
//				}
//			}
//		}
//	}
//}