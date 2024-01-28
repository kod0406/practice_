#include <stdio.h>

int main() {
    int N; // �Ʒ��� ũ��
    int x = 1, y = 1; // �ʱ� ��ġ (1,1)
    char swing[51]; // ���� ���
    int i = 0; // ���� ��� �ε���

    // �Ʒ��� ũ�� �Է�
    scanf("%d", &N);
    if (N < 1 || N > 50) {
        printf("�Ʒ��� ũ��� 1 �̻� 50 ������ �������� �մϴ�.\n");
        return 1;
    }

    // ���� ��� �Է�
    scanf("%s", swing);

    // ���� ��Ͽ� ���� ���� ��ġ ������Ʈ
    while (swing[i] != '\0') {
        char move = swing[i];
        switch (move) {
        case 'U':
            if (x > 1) x--;
            break;
        case 'D':
            if (x < N) x++;
            break;
        case 'L':
            if (y > 1) y--;
            break;
        case 'R':
            if (y < N) y++;
            break;
        }
        i++;
    }

    // ���� ������ ��ġ ���
    printf("�� ������ ��ġ: (%d, %d)\n", x, y);

    return 0;
}
