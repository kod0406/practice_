#pragma once

// �ڷ��� ����
typedef int element;

// ť�� ��带 ��Ÿ���� ����ü
typedef struct QNode {
    element data;
    struct QNode* link;
} QNode;

// ť�� ��Ÿ���� ����ü
typedef struct {
    QNode* front, * rear;
} LQueueType;

// �Լ� ����
LQueueType* createLinkedQueue(void); // ���ο� ť�� �����ϰ� ť�� ���� �����͸� ��ȯ
int isLQEmpty(LQueueType* LQ); //  ť�� ��� �ִ��� Ȯ��
void enLQueue(LQueueType* LQ, element item); //  ť�� ���Ҹ� �߰�
element deLQueue(LQueueType* LQ); // ť���� ���Ҹ� �����ϰ� ���� ��ȯ
element peekLQ(LQueueType* LQ); // ť�� �� �տ� �ִ� ���Ҹ� Ȯ���ϴ� �Լ�
void printLQ(LQueueType* LQ); // ť�� ������ ����ϴ� �Լ�