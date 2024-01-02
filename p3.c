#include <stdio.h>

// 분수 정보를 담는 구조체
struct fraction {
    int numerator;   // 분자
    int denominator; // 분모
};

int main() {
    struct fraction a = { 4,5 };
    struct fraction b = { 3,7 };
    struct fraction c = { (a.numerator * b.numerator) ,(a.denominator * b.denominator) };
    printf("a = %d / %d\n", a.numerator, a.denominator);
    printf("b = %d / %d\n", b.numerator, b.denominator);
    printf("c = a * b = %d / %d", c.numerator, c.denominator);

}
