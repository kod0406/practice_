#include <stdio.h>
#include <stdlib.h>
#include "LinkedQueue.h"

// 빈 큐를 생성하고 그에 대한 포인터를 반환하는 함수
LQueueType* createLinkedQueue(void) {
    LQueueType* LQ = (LQueueType*)malloc(sizeof(LQueueType));
    LQ->front = LQ->rear = NULL;
    return LQ;
}

// 큐가 비어 있는지 여부를 확인하는 함수
int isLQEmpty(LQueueType* LQ) {
    return LQ->front == NULL;
}

// 큐에 원소를 추가하는 함수
void enLQueue(LQueueType* LQ, element item) {
    QNode* newNode = (QNode*)malloc(sizeof(QNode));
    newNode->data = item;
    newNode->link = NULL;
    // 큐가 비어있는 경우
    if (isLQEmpty(LQ)) {
        LQ->front = newNode;
        LQ->rear = newNode;
    }
    else {
        // 큐가 비어있지 않은 경우
        LQ->rear->link = newNode; // 현재 rear의 link를 새로운 노드로 설정
        LQ->rear = newNode; // 큐의 rear를 새로운 노드로 갱신
    }
}

// 큐에서 원소를 제거하고, 그 값을 반환하는 함수
element deLQueue(LQueueType* LQ) {
    if (isLQEmpty(LQ)) { //큐가 비어 있다면, 에러 메시지를 출력하고 프로그램을 종료
        fprintf(stderr, "Queue is empty\n");
        exit(EXIT_FAILURE);
    }
    QNode* temp = LQ->front; // 임시 노드 생성
    element item = temp->data; // 큐에서 제거되는 데이터 저장
    LQ->front = temp->link; // 프론트 이동
    free(temp);
    return item;
}

// 큐의 맨 앞에 있는 원소를 반환하는 함수
element peekLQ(LQueueType* LQ) {
    if (isLQEmpty(LQ)) {
        fprintf(stderr, "Queue is empty\n");
        exit(EXIT_FAILURE);
    }
    return LQ->front->data;
}

// 큐의 내용을 출력하는 함수
void printLQ(LQueueType* LQ) {
    QNode* p = LQ->front;
    while (p != NULL) {
        printf("%d ", p->data);
        p = p->link;
    }
    printf("\n");
}
