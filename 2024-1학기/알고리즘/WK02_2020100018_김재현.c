#define _CRT_SECURE_NO_WARNINGS
#include stdio.h

int main(void) {
	int score[] = {31,63,62,87,14,20,52,11,80,20 };
	int i = 0;
	int input = 0;
	printf(원하는 키 값을 입력하시오);
	scanf(%d, &input);
	for (i = 0; isizeof(score)4 ; i++) {
		if(score[i]==input){
			printf(%d는 인덱스 %d 번째에 있습니다...,input,i);
			i++;
			for (i; i  sizeof(score)  4; i++) {
				if(score[i] == input) {
					printf(%d는 인덱스 %d 번째에 있습니다..., input, i);
				}
			}
		}else if(i==sizeof(score)4-1){
			printf(찾는 값이 없습니다...);
		}
		
	}
}