#include <stdio.h>

// �м� ������ ��� ����ü
struct fraction {
    int numerator;   // ����
    int denominator; // �и�
};

int main() {
    struct fraction a = { 4,5 };
    struct fraction b = { 3,7 };
    struct fraction c = { (a.numerator * b.numerator) ,(a.denominator * b.denominator) };
    printf("a = %d / %d\n", a.numerator, a.denominator);
    printf("b = %d / %d\n", b.numerator, b.denominator);
    printf("c = a * b = %d / %d", c.numerator, c.denominator);

}
