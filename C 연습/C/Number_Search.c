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
	printf("1���� 100������ �ϳ��� ������ �����Ǿ����ϴ�.\n�� ������ ���߾� ������? > ");
}
void printHigher(int guess) {
	printf("���߾�� �� ������ �Է��� ���� %d���� �۽��ϴ�. (%d�� �õ�)\n%d���� %d������ ������ �ٽ� �Է��ϼ���. > ", guess, count, min, max);
}
void printLower(int guess) {
	printf("���߾�� �� ������ �Է��� ���� %d���� Ů�ϴ�. (%d�� �õ�)\n%d���� %d������ ������ �ٽ� �Է��ϼ���. > ", guess, count, min, max);
}
void printAnswer(int guess) {
	printf("�����մϴ�! ������ %d�Դϴ�. (�õ�Ƚ��: %d��)\n", guess, count);
}
int main() {
	setNumber();
	int guess = 0;
	printHead();
	do {
		scanf("%d", &guess);
		count++; // �õ� Ƚ�� ����
		if (guess > number) {
			max = guess - 1;
			if (count < 5) { // �ִ� �õ� Ƚ�� �̳��� ��
				printHigher(guess);
			}
			else { // �ִ� �õ� Ƚ���� �ʰ��ϸ� ����
				printf("�ִ� �õ� Ƚ���� 5ȸ ���� ������ ���Ͽ����ϴ�. ������ %d�Դϴ�. \n", number);
				printf("������ %d�Դϴ�. \n", number); // �߰�
				return 0;
			}
		}
		else if (guess < number) {
			min = guess + 1;
			if (count < 5) { // �ִ� �õ� Ƚ�� �̳��� ��
				printLower(guess);
			}
			else { // �ִ� �õ� Ƚ���� �ʰ��ϸ� ����
				printf("�ִ� �õ� Ƚ���� 5ȸ ���� ������ ���Ͽ����ϴ�. ������ %d�Դϴ�. \n", number);
				printf("������ %d�Դϴ�. \n", number); // �߰�
				return 0;
			}
		}
		else {
			printAnswer(guess);
		}
	} while (guess != number && count < 5); // �ִ� �õ� Ƚ�� �̳��� �� �ݺ�
	return 0;
}