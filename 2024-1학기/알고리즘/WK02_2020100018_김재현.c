#define _CRT_SECURE_NO_WARNINGS
#include stdio.h

int main(void) {
	int score[] = {31,63,62,87,14,20,52,11,80,20 };
	int i = 0;
	int input = 0;
	printf(���ϴ� Ű ���� �Է��Ͻÿ�);
	scanf(%d, &input);
	for (i = 0; isizeof(score)4 ; i++) {
		if(score[i]==input){
			printf(%d�� �ε��� %d ��°�� �ֽ��ϴ�...,input,i);
			i++;
			for (i; i  sizeof(score)  4; i++) {
				if(score[i] == input) {
					printf(%d�� �ε��� %d ��°�� �ֽ��ϴ�..., input, i);
				}
			}
		}else if(i==sizeof(score)4-1){
			printf(ã�� ���� �����ϴ�...);
		}
		
	}
}