#include <stdio.h>

int main() {
    int a[] = { 11,22,33,44,55,66 };
    int* p = a;
    int* q = a + 5;
    while(p < q) {
        int tmp = *p;
        *p = *q;
        *q = tmp;
        p++;
        q--;
    }
}