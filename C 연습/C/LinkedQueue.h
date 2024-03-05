#pragma once

// 자료형 정의
typedef int element;

// 큐의 노드를 나타내는 구조체
typedef struct QNode {
    element data;
    struct QNode* link;
} QNode;

// 큐를 나타내는 구조체
typedef struct {
    QNode* front, * rear;
} LQueueType;

// 함수 선언
LQueueType* createLinkedQueue(void); // 새로운 큐를 생성하고 큐에 대한 포인터를 반환
int isLQEmpty(LQueueType* LQ); //  큐가 비어 있는지 확인
void enLQueue(LQueueType* LQ, element item); //  큐에 원소를 추가
element deLQueue(LQueueType* LQ); // 큐에서 원소를 제거하고 값을 반환
element peekLQ(LQueueType* LQ); // 큐의 맨 앞에 있는 원소를 확인하는 함수
void printLQ(LQueueType* LQ); // 큐의 내용을 출력하는 함수