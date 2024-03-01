#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

#define MAX_N 10
#define MAX_M 2047

// 트리구조를 나타내는 2차원 배열
int tree[MAX_N + 1][MAX_M + 1];

// 트리 초기화
void initTree() {
    for (int i = 0; i <= MAX_N; i++) {
        for (int j = 0; j <= MAX_M; j++) {
            tree[i][j] = 0;
        }
    }
}

// 트리 데이터 읽기
void readTreeData(int n) {
    for (int i = 0; i < (1 << (n + 1)) - 1; i++) {
        scanf("%d", &tree[n][i]);
    }
}

// 고양이 위치 예상 함수
int findCatLocation(int n, int k) {
    if (k == 0) {
        return 1;
    }

    // 왼쪽과 오른쪽 가지에서 각각 k-1만큼 재귀 호출
    int leftCatLocation = findCatLocation(n - 1, k - 1);
    int rightCatLocation = findCatLocation(n - 1, k - 1);

    // 가지에 고양이가 있다면 해당 위치를 반환
    if (tree[n][leftCatLocation + 1] == 1) {
        return leftCatLocation + 2;
    }

    // 오른쪽 가지에서 반환된 위치를 반환
    return rightCatLocation + 2;
}

// 메인 함수
int main() {
    int n, k;
    // 나무의 가지 단계(N)와 '야옹' 울음소리 횟수(K) 입력
    scanf("%d %d", &n, &k);

    // 나무 초기화 및 데이터 읽기
    initTree();
    readTreeData(n);

    // 고양이의 위치 예상
    int catLocation = findCatLocation(n, k);
    // 출력 형식에 맞게 출력
    printf("%d %d\n", catLocation - 1, catLocation + 1);

    return 0;
}
