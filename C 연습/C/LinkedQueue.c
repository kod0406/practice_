#include <stdio.h>
#include <stdlib.h>
#include "LinkedQueue.h"

// �� ť�� �����ϰ� �׿� ���� �����͸� ��ȯ�ϴ� �Լ�
LQueueType* createLinkedQueue(void) {
    LQueueType* LQ = (LQueueType*)malloc(sizeof(LQueueType));
    LQ->front = LQ->rear = NULL;
    return LQ;
}

// ť�� ��� �ִ��� ���θ� Ȯ���ϴ� �Լ�
int isLQEmpty(LQueueType* LQ) {
    return LQ->front == NULL;
}

// ť�� ���Ҹ� �߰��ϴ� �Լ�
void enLQueue(LQueueType* LQ, element item) {
    QNode* newNode = (QNode*)malloc(sizeof(QNode));
    newNode->data = item;
    newNode->link = NULL;
    // ť�� ����ִ� ���
    if (isLQEmpty(LQ)) {
        LQ->front = newNode;
        LQ->rear = newNode;
    }
    else {
        // ť�� ������� ���� ���
        LQ->rear->link = newNode; // ���� rear�� link�� ���ο� ���� ����
        LQ->rear = newNode; // ť�� rear�� ���ο� ���� ����
    }
}

// ť���� ���Ҹ� �����ϰ�, �� ���� ��ȯ�ϴ� �Լ�
element deLQueue(LQueueType* LQ) {
    if (isLQEmpty(LQ)) { //ť�� ��� �ִٸ�, ���� �޽����� ����ϰ� ���α׷��� ����
        fprintf(stderr, "Queue is empty\n");
        exit(EXIT_FAILURE);
    }
    QNode* temp = LQ->front; // �ӽ� ��� ����
    element item = temp->data; // ť���� ���ŵǴ� ������ ����
    LQ->front = temp->link; // ����Ʈ �̵�
    free(temp);
    return item;
}

// ť�� �� �տ� �ִ� ���Ҹ� ��ȯ�ϴ� �Լ�
element peekLQ(LQueueType* LQ) {
    if (isLQEmpty(LQ)) {
        fprintf(stderr, "Queue is empty\n");
        exit(EXIT_FAILURE);
    }
    return LQ->front->data;
}

// ť�� ������ ����ϴ� �Լ�
void printLQ(LQueueType* LQ) {
    QNode* p = LQ->front;
    while (p != NULL) {
        printf("%d ", p->data);
        p = p->link;
    }
    printf("\n");
}
