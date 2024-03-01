#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

#define MAX_N 10
#define MAX_M 2047

// Ʈ�������� ��Ÿ���� 2���� �迭
int tree[MAX_N + 1][MAX_M + 1];

// Ʈ�� �ʱ�ȭ
void initTree() {
    for (int i = 0; i <= MAX_N; i++) {
        for (int j = 0; j <= MAX_M; j++) {
            tree[i][j] = 0;
        }
    }
}

// Ʈ�� ������ �б�
void readTreeData(int n) {
    for (int i = 0; i < (1 << (n + 1)) - 1; i++) {
        scanf("%d", &tree[n][i]);
    }
}

// ����� ��ġ ���� �Լ�
int findCatLocation(int n, int k) {
    if (k == 0) {
        return 1;
    }

    // ���ʰ� ������ �������� ���� k-1��ŭ ��� ȣ��
    int leftCatLocation = findCatLocation(n - 1, k - 1);
    int rightCatLocation = findCatLocation(n - 1, k - 1);

    // ������ ����̰� �ִٸ� �ش� ��ġ�� ��ȯ
    if (tree[n][leftCatLocation + 1] == 1) {
        return leftCatLocation + 2;
    }

    // ������ �������� ��ȯ�� ��ġ�� ��ȯ
    return rightCatLocation + 2;
}

// ���� �Լ�
int main() {
    int n, k;
    // ������ ���� �ܰ�(N)�� '�߿�' �����Ҹ� Ƚ��(K) �Է�
    scanf("%d %d", &n, &k);

    // ���� �ʱ�ȭ �� ������ �б�
    initTree();
    readTreeData(n);

    // ������� ��ġ ����
    int catLocation = findCatLocation(n, k);
    // ��� ���Ŀ� �°� ���
    printf("%d %d\n", catLocation - 1, catLocation + 1);

    return 0;
}
