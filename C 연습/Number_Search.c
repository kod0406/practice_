#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int number;
int count = 0;
static int min = 1;
static int max = 100;

void setNumber() {
	srand(time(NULL));
	number = rand() % 100 + 1;
}
void printHead() {
	printf("1에서 100까지의 하나의 정수가 결정되었습니다.\n이 정수를 맞추어 보세요? > ");
}
void printHigher(int guess) {
	printf("맞추어야 할 정수가 입력한 정수 %d보다 작습니다. (%d번 시도)\n%d에서 %d사이의 정수를 다시 입력하세요. > ", guess, count, min, max);
}
void printLower(int guess) {
	printf("맞추어야 할 정수가 입력한 정수 %d보다 큽니다. (%d번 시도)\n%d에서 %d사이의 정수를 다시 입력하세요. > ", guess, count, min, max);
}
void printAnswer(int guess) {
	printf("축하합니다! 정답은 %d입니다. (시도횟수: %d번)\n", guess, count);
}
int main() {
	setNumber();
	int guess = 0;
	printHead();
	do {
		scanf("%d", &guess);
		count++; // 시도 횟수 증가
		if (guess > number) {
			max = guess - 1;
			if (count < 5) { // 최대 시도 횟수 이내일 때
				printHigher(guess);
			}
			else { // 최대 시도 횟수를 초과하면 종료
				printf("최대 시도 횟수인 5회 동안 맞추지 못하였습니다. 정답은 %d입니다. \n", number);
				printf("정답은 %d입니다. \n", number); // 추가
				return 0;
			}
		}
		else if (guess < number) {
			min = guess + 1;
			if (count < 5) { // 최대 시도 횟수 이내일 때
				printLower(guess);
			}
			else { // 최대 시도 횟수를 초과하면 종료
				printf("최대 시도 횟수인 5회 동안 맞추지 못하였습니다. 정답은 %d입니다. \n", number);
				printf("정답은 %d입니다. \n", number); // 추가
				return 0;
			}
		}
		else {
			printAnswer(guess);
		}
	} while (guess != number && count < 5); // 최대 시도 횟수 이내일 때 반복
	return 0;
}